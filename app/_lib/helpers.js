import { format } from "date-fns";
const currentDate = new Date();

export function today() {
  return format(currentDate, "P");
}

export function currentTime() {
  const hour = String(currentDate.getHours()).padStart(2, "0");
  const min = String(currentDate.getMinutes()).padStart(2, "0");
  return `${hour}:${min}`;
}

export function partOfDay() {
  const currentHour = currentDate.getHours();

  if (currentHour >= 4 && currentHour <= 8) return "morning";
  if (currentHour >= 9 && currentHour <= 14) return "day";
  if (currentHour >= 15 && currentHour <= 17) return "afternoon";
  if (currentHour >= 18 && currentHour <= 21) return "evening";
  return "night";
}

export function formatMoney(number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number) + " $"
  );
}
