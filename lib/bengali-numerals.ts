const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function convertToBengaliNumerals(num: number | string): string {
  const numStr = typeof num === "number" ? num.toString() : num;
  return numStr.replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function convertToEnglishNumerals(numStr: string): number {
  const bengaliToEnglish: Record<string, string> = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  const converted = numStr.replace(
    /[০-৯]/g,
    (digit) => bengaliToEnglish[digit] || digit,
  );
  return parseInt(converted, 10);
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}
