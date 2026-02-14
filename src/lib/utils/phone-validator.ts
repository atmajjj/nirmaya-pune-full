export const normalizeIndianPhone = (value: string): string => {
  return value.replace(/\D/g, "").slice(-10);
};

export const isValidIndianPhone = (value: string): boolean => {
  const digits = normalizeIndianPhone(value);
  return /^\d{10}$/.test(digits);
};

export const formatIndianPhone = (value: string): string => {
  const digits = normalizeIndianPhone(value);
  if (!digits) return "";

  const part1 = digits.slice(0, 5);
  const part2 = digits.slice(5, 10);

  return part2 ? `${part1} ${part2}` : part1;
};

export const toE164 = (value: string, countryCode = "+91"): string => {
  const digits = normalizeIndianPhone(value);
  return `${countryCode}${digits}`;
};
