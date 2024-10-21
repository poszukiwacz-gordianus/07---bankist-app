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
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
}

export const validateFormData = (actionType, data, userState) => {
  switch (actionType) {
    case "loan":
      if (!data.amount || Number(data.amount) <= 0)
        return "Loan amount must be greater than 0.";

      if (
        !userState?.currentUser?.movements.some(
          (mov) => mov.amount >= Number(data.amount) * 0.1,
        )
      )
        return "We can't grand you this much loan.";
      break;

    case "transfer":
      const balance = userState.currentUser?.movements?.reduce(
        (acc, mov) => acc + mov.amount,
        0,
      );
      if (!data.amount || Number(data.amount) <= 0) {
        return "Transfer amount must be greater than 0.";
      }
      if (Number(data.amount) > balance) {
        return "Insufficient balance.";
      }
      const recipient = userState.accounts.find(
        (account) => account.user === data.recipientUser,
      );
      if (!recipient) {
        return "Recipient does not exist.";
      }

      if (userState.currentUser.user === data.recipientUser)
        return "You cannot transfer many to yourself!";
      break;

    case "closeAccount":
      if (
        data.pin !== userState.currentUser.pin ||
        data.user !== userState.currentUser.user
      ) {
        return "Incorrect information. Please try again.";
      }
      break;

    default:
      return null;
  }
  return null;
};

export const sortedArray = (arr, method) => [...arr].sort(method);

export const formatTime = (time) => {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};
