import { Shield, Bell, MapPin, Sparkles } from "lucide-react";

const benefits = [
  {
    title: "Instant Alerts",
    description: "Get notified within minutes when water quality turns unsafe.",
    icon: Bell,
  },
  {
    title: "Location-Specific",
    description: "Alerts tailored to your city, district, and state.",
    icon: MapPin,
  },
  {
    title: "Privacy First",
    description: "We never share your email address and you can opt out anytime.",
    icon: Shield,
  },
  {
    title: "Actionable Advice",
    description: "Health guidance and remediation updates in your language.",
    icon: Sparkles,
  },
];

const SubscriptionBenefits = () => {
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/60 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-slate-800/80 dark:text-blue-200">
        <Bell className="h-4 w-4" />
        Email Alerts
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight dark:text-slate-100">
        Get water quality alerts via email
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-300">
        Stay ahead of contamination risks with real-time email notifications. Built for communities,
        scientists, and policymakers across India.
      </p>

      <div className="grid gap-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex items-start gap-4 rounded-xl border border-blue-100 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
              <benefit.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{benefit.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionBenefits;
