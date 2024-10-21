const today = new Date();

export function currentDate(locale) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options).format(today);
}

export function formatDate(date, locale) {
  const daysPassed = Math.round(Math.abs(date - today) / (1000 * 60 * 60 * 24));

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 3) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(new Date(date));
}

export function partOfDay() {
  const currentHour = today.getHours();

  if (currentHour >= 4 && currentHour <= 8) return "morning";
  if (currentHour >= 9 && currentHour <= 14) return "day";
  if (currentHour >= 15 && currentHour <= 17) return "afternoon";
  if (currentHour >= 18 && currentHour <= 21) return "evening";
  return "night";
}

export function formatCurrency(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
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
        +data.pin !== userState.currentUser.pin ||
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

export const sortArray = (arr, method) => [...arr].sort(method);

export const sortMovements = (type, movements) => {
  switch (type) {
    case "asc":
      return sortArray(movements, (a, b) => a.amount - b.amount);
    case "desc":
      return sortArray(movements, (a, b) => b.amount - a.amount);
    case "dateAsc":
      return sortArray(
        movements,
        (a, b) => new Date(a.date) - new Date(b.date),
      );
    case "dateDesc":
    default:
      return sortArray(
        movements,
        (a, b) => new Date(b.date) - new Date(a.date),
      );
  }
};

export const formatTime = (time) => {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export const generateDateFromToday = (daysOffset) => {
  const date = new Date();
  if (daysOffset > -3) date.setDate(date.getDate() + daysOffset);
  else date.setDate(date.getDate() + daysOffset * 20);
  return date;
};
