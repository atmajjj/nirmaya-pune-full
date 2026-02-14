import { z } from "zod";

export const alertTypeValues = [
  "critical",
  "daily",
  "contamination",
  "policy",
  "remediation",
  "health",
] as const;

export const frequencyValues = ["instant", "daily", "weekly"] as const;

export const languageValues = ["en", "hi", "mr", "ta", "te", "bn", "gu"] as const;

export const smsSubscriptionSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  location: z.object({
    state: z.string().min(1, "Please select your state"),
    city: z.string().min(1, "Please select your city"),
    district: z.string().optional(),
    label: z.string().optional(),
  }),
  alertTypes: z.array(z.enum(alertTypeValues)).min(1, "Select at least one alert type"),
  frequency: z.enum(frequencyValues),
  language: z.enum(languageValues),
  consent: z.boolean().refine((value) => value === true, {
    message: "You must agree to receive email alerts",
  }),
});

export type SmsSubscriptionFormValues = z.infer<typeof smsSubscriptionSchema>;
