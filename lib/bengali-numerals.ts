const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function convertToBengaliNumerals(num: number | string): string {
  const numStr = typeof num === "number" ? num.toString() : num;
  return numStr.replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
}

export function convertToEnglishNumerals(numStr: string): number {
  const bengaliToEnglish: Record<string, string> = {
    "০": "0",
    "১": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
  };

  const converted = numStr.replace(
    /[০-९]/g,
    (digit) => bengaliToEnglish[digit] || digit,
  );
  return parseInt(converted, 10);
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}
