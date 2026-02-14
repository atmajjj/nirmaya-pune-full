export type AlertType =
  | "critical"
  | "daily"
  | "contamination"
  | "policy"
  | "remediation"
  | "health";

export type AlertFrequency = "instant" | "daily" | "weekly";

export type AlertLanguage = "en" | "hi" | "mr" | "ta" | "te" | "bn" | "gu";

export interface SmsAlertLocation {
  state: string;
  city: string;
  district?: string;
  label?: string;
}

export interface SmsSubscriptionRequest {
  phoneNumber?: string;
  email: string;
  countryCode?: string;
  location: SmsAlertLocation;
  alertTypes: AlertType[];
  frequency: AlertFrequency;
  language: AlertLanguage;
  consent: boolean;
  verificationCode?: string;
}

export interface SmsSubscriptionResponse {
  success: boolean;
  message: string;
  data?: {
    subscriptionId: string;
    phoneNumber: string;
    location: string;
    requiresVerification?: boolean;
    isActive?: boolean;
  };
}

export interface SmsVerifyRequest {
  phoneNumber: string;
  location: SmsAlertLocation;
}

export interface SmsVerifyResponse {
  success: boolean;
  message: string;
  data?: {
    verificationCode?: string;
    sentAt?: string;
  };
}

export interface SmsLocationOption {
  state: string;
  city: string;
  district?: string;
  label: string;
}

export interface SmsLocationsResponse {
  success: boolean;
  message: string;
  data?: {
    locations: SmsLocationOption[];
  };
}
