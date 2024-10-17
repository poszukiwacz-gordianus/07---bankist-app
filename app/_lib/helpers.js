import { format } from "date-fns";
const currentDate = new Date();

export function today() {
  return format(currentDate, "P");
}

export function currentTime() {
  return `${currentDate.getHours()}:${currentDate.getMinutes()}`;
}

export function partOfDay() {
  const currentHour = currentDate.getHours();
  const partOfDay =
    currentHour >= 20
      ? "evening"
      : currentHour >= 12
        ? "afternoon"
        : currentHour <= 11 && currentHour >= 4
          ? "morning"
          : "night";

  return partOfDay;
}
