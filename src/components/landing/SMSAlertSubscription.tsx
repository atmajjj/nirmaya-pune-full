import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, MapPin, Phone, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  alertTypeValues,
  frequencyValues,
  languageValues,
  smsSubscriptionSchema,
  type SmsSubscriptionFormValues,
} from "@/lib/validations/sms-subscription";
import { buildLocationOptions } from "@/lib/india-locations";
import { smsAlertsService } from "@/services/api/smsAlertsService";
import { showErrorToast, showSuccessToast } from "@/lib/toast-utils";
import type { SmsAlertLocation, SmsLocationOption } from "@/types/sms-alerts";

const alertTypeLabels: Record<string, string> = {
  critical: "Critical Alerts (WQI > 300)",
  daily: "Daily Quality Updates",
  contamination: "Contamination Warnings",
  policy: "Policy Updates",
  remediation: "Remediation Notices",
  health: "Health Advisories",
};

const alertTypeDescriptions: Record<string, string> = {
  critical: "Immediate health risk notifications",
  daily: "Daily WQI summary at 8 AM",
  contamination: "Heavy metal and industrial pollution alerts",
  policy: "New regulations and government initiatives",
  remediation: "Treatment plant and alternative water source updates",
  health: "Disease outbreak warnings and safety guidance",
};

const frequencyLabels: Record<string, string> = {
  instant: "Instant Alerts",
  daily: "Daily Digest (8 AM)",
  weekly: "Weekly Summary (Monday)",
};

const languageLabels: Record<string, string> = {
  en: "English",
  hi: "हिंदी (Hindi)",
  mr: "मराठी (Marathi)",
  ta: "தமிழ் (Tamil)",
  te: "తెలుగు (Telugu)",
  bn: "বাংলা (Bengali)",
  gu: "ગુજરાતી (Gujarati)",
};

const SMSAlertSubscription = () => {
  const [locationOptions, setLocationOptions] = useState<SmsLocationOption[]>([]);
  const [locationOpen, setLocationOpen] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SmsSubscriptionFormValues>({
    resolver: zodResolver(smsSubscriptionSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      location: { state: "", city: "", district: "", label: "" },
      alertTypes: ["critical", "contamination"],
      frequency: "daily",
      language: "en",
      consent: false,
    },
  });

  const { register, setValue, watch, formState, reset } = form;

  const selectedLocation = watch("location");

  const currentLocationLabel = selectedLocation?.label || "";

  const filteredOptions = useMemo(() => {
    return locationOptions;
  }, [locationOptions]);

  useEffect(() => {
    let isMounted = true;
    const fetchLocations = async () => {
      setIsLoadingLocations(true);
      try {
        const response = await smsAlertsService.getLocations();
        const rawLocations = response?.data?.locations || [];
        const locations = Array.isArray(rawLocations) && rawLocations.length > 0
          ? rawLocations.flatMap((location) => {
              if ("cities" in location && Array.isArray(location.cities)) {
                return location.cities.map((city) => ({
                  state: location.state,
                  city,
                  label: `${location.state} > ${city}`,
                }));
              }
              return [location];
            })
          : [];
        if (isMounted) {
          setLocationOptions(locations.length > 0 ? locations : buildLocationOptions());
        }
      } catch (error) {
        if (isMounted) {
          setLocationOptions(buildLocationOptions());
        }
      } finally {
        if (isMounted) {
          setIsLoadingLocations(false);
        }
      }
    };

    fetchLocations();

    return () => {
      isMounted = false;
    };
  }, []);

  const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
    const analytics = (window as any)?.analytics;
    if (analytics?.track) {
      analytics.track(eventName, data);
    } else {
      console.log("Analytics", eventName, data || {});
    }
  };

  const handleLocationSelect = (option: SmsLocationOption) => {
    setValue("location", option, { shouldValidate: true });
    setLocationOpen(false);
  };

  const normalizeLocation = (location: SmsSubscriptionFormValues["location"]): SmsAlertLocation => ({
    state: location.state || "",
    city: location.city || "",
    district: location.district,
    label: location.label,
  });

  const submitSubscription = async (payload: SmsSubscriptionFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await smsAlertsService.subscribe({
        email: payload.email,
        location: normalizeLocation(payload.location),
        alertTypes: payload.alertTypes,
        frequency: payload.frequency,
        language: payload.language,
        consent: payload.consent,
      });

      if (!response.success) {
        throw new Error(response.message || "Subscription failed");
      }

      setIsSuccess(true);
      showSuccessToast("Subscription successful", "Alert email sent. Please check your inbox.");
      reset();

      trackEvent("sms_alerts_subscribed", {
        location: response.data?.location,
        frequency: payload.frequency,
        language: payload.language,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Subscription failed";
      showErrorToast("Subscription failed", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (payload: SmsSubscriptionFormValues) => {
    await submitSubscription(payload);
  };

  return (
    <Card className="bg-white border-2 border-blue-100 shadow-xl rounded-2xl dark:bg-slate-900/70 dark:border-slate-700">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2 dark:text-slate-100">
          <Phone className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          Get Water Quality Alerts via Email
        </CardTitle>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Stay informed about water safety in your area with real-time email alerts.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {isSuccess ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-700/60 dark:bg-emerald-900/30">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold dark:text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
              Subscription Successful!
            </div>
            <p className="text-sm text-emerald-700 mt-2 dark:text-emerald-200">
              Your alert email has been sent. Please check your inbox for the latest update.
            </p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email Address *</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="your.email@example.com"
                className="h-12 bg-white dark:bg-slate-950/70 dark:text-slate-100 dark:border-slate-700"
                aria-label="Email address"
              />
              {formState.errors.email && (
                <p className="text-xs text-red-500">{formState.errors.email.message}</p>
              )}
              <p className="text-xs text-slate-500 dark:text-slate-400">We'll send your OTP verification code here</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Your Location *</Label>
              <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex h-12 w-full items-center justify-between rounded-lg border border-slate-300 px-3 text-left text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                      {currentLocationLabel || "Select your location"}
                    </span>
                    <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full max-w-md dark:border-slate-700 dark:bg-slate-900">
                  <Command>
                    <CommandInput placeholder="Search city, district, or state..." />
                    <CommandList>
                      <CommandEmpty>
                        {isLoadingLocations ? "Loading locations..." : "No locations found."}
                      </CommandEmpty>
                      <CommandGroup>
                        {filteredOptions.map((option) => (
                          <CommandItem
                            key={`${option.state}-${option.city}`}
                            value={option.label}
                            onSelect={() => handleLocationSelect(option)}
                          >
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {formState.errors.location && (
                <p className="text-xs text-red-500">Please select a valid location.</p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Alert Types (Select at least one) *
              </Label>
              <div className="grid gap-3 md:grid-cols-2">
                {alertTypeValues.map((type) => (
                  <label
                    key={type}
                    className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 hover:border-blue-200 dark:border-slate-700 dark:hover:border-blue-400"
                  >
                    <Checkbox
                      checked={watch("alertTypes").includes(type)}
                      onCheckedChange={(checked) => {
                        const current = watch("alertTypes");
                        const updated = checked
                          ? [...current, type]
                          : current.filter((item) => item !== type);
                        setValue("alertTypes", updated, { shouldValidate: true });
                      }}
                      className="mt-1"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{alertTypeLabels[type]}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{alertTypeDescriptions[type]}</p>
                    </div>
                  </label>
                ))}
              </div>
              {formState.errors.alertTypes && (
                <p className="text-xs text-red-500">{formState.errors.alertTypes.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Frequency *</Label>
              <RadioGroup
                value={watch("frequency")}
                onValueChange={(value) => setValue("frequency", value as "instant" | "daily" | "weekly", { shouldValidate: true })}
                className="flex flex-wrap gap-4"
              >
                {frequencyValues.map((frequency) => (
                  <label key={frequency} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <RadioGroupItem value={frequency} />
                    {frequencyLabels[frequency]}
                  </label>
                ))}
              </RadioGroup>
              {formState.errors.frequency && (
                <p className="text-xs text-red-500">{formState.errors.frequency.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Language *</Label>
              <Select
                value={watch("language")}
                onValueChange={(value) => setValue("language", value as SmsSubscriptionFormValues["language"], { shouldValidate: true })}
              >
                <SelectTrigger className="h-12 border-slate-300 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="dark:border-slate-700 dark:bg-slate-900">
                  {languageValues.map((language) => (
                    <SelectItem key={language} value={language}>
                      {languageLabels[language]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formState.errors.language && (
                <p className="text-xs text-red-500">{formState.errors.language.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <Checkbox
                  checked={watch("consent")}
                  onCheckedChange={(checked) =>
                    setValue("consent", Boolean(checked), { shouldValidate: true })
                  }
                />
                <span>I agree to receive email alerts from NIRMAYA.</span>
              </label>
              {formState.errors.consent && (
                <p className="text-xs text-red-500">{formState.errors.consent.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!formState.isValid || isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-[1.01] transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Subscribing...
                </span>
              ) : (
                "Subscribe to Alerts"
              )}
            </Button>

            <p className="text-xs text-slate-500 text-center">
              Your privacy is protected. We never share your email address. Unsubscribe anytime.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default SMSAlertSubscription;
