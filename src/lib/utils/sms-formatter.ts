export type SmsLanguage = "en" | "hi" | "mr" | "ta" | "te" | "bn" | "gu";

export const formatLocationLabel = (state: string, city: string): string => {
  return `${city}, ${state}`;
};

export const formatConsentLine = (language: SmsLanguage): string => {
  switch (language) {
    case "hi":
      return "आप किसी भी समय STOP भेजकर सदस्यता समाप्त कर सकते हैं।";
    case "mr":
      return "तुम्ही कधीही STOP पाठवून सदस्यता रद्द करू शकता.";
    case "ta":
      return "நீங்கள் எப்போது வேண்டுமானாலும் STOP பதிலளித்து வெளியேறலாம்.";
    case "te":
      return "మీరు ఎప్పుడైనా STOP తో సభ్యత్వం రద్దు చేయవచ్చు.";
    case "bn":
      return "আপনি যেকোনো সময় STOP পাঠিয়ে সদস্যতা বাতিল করতে পারেন।";
    case "gu":
      return "તમે કોઈ પણ સમયે STOP મોકલીને સભ્યપદ રદ કરી શકો છો.";
    default:
      return "You can unsubscribe anytime by replying STOP.";
  }
};
