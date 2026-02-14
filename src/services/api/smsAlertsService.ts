import { apiClient } from "./apiClient";
import type {
  SmsSubscriptionRequest,
  SmsSubscriptionResponse,
  SmsVerifyRequest,
  SmsVerifyResponse,
  SmsLocationsResponse,
} from "@/types/sms-alerts";

export const smsAlertsService = {
  subscribe: (payload: SmsSubscriptionRequest) =>
    apiClient.post<SmsSubscriptionResponse>("/sms-alerts/subscribe", payload),

  verify: (payload: SmsVerifyRequest) =>
    apiClient.post<SmsVerifyResponse>("/sms-alerts/verify", payload),

  unsubscribe: (payload: { phoneNumber: string; location?: SmsVerifyRequest["location"] }) =>
    apiClient.post("/sms-alerts/unsubscribe", payload),

  getLocations: () => apiClient.get<SmsLocationsResponse>("/sms-alerts/locations"),
};
