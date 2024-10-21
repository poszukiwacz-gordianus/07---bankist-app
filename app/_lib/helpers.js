export function currentDate(locale) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options).format(new Date());
}

export function formatDate(date, locale) {
  const daysPassed = Math.round(
    Math.abs(date - new Date()) / (1000 * 60 * 60 * 24),
  );

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 3) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(new Date(date));
}

export function partOfDay() {
  const currentHour = new Date().getHours();

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
  const checkCredentials = (acc, pin, user) => {
    return acc.some((acc) => acc.pin === pin && acc.user === user);
  };

  const validateConditions = (conditions) => {
    for (const condition of conditions) {
      if (condition.check) {
        return condition.message;
      }
    }
    return null; // No errors found
  };

  switch (actionType) {
    case "login":
      return validateConditions([
        {
          check: !checkCredentials(userState, +data.pin, data.user),
          message: "Wrong credentials. Please try again.",
        },
      ]);

    case "addLoanMovement":
      return validateConditions([
        {
          check: !data.amount || +data.amount <= 0,
          message: "Loan amount must be greater than 0.",
        },
        {
          check: !userState?.currentUser?.movements.some(
            (mov) => mov.amount >= +data.amount * 0.1,
          ),
          message: "We can't grand you this much loan.",
        },
      ]);

    case "addTransferMovement":
      const balance = userState.currentUser?.movements?.reduce(
        (acc, mov) => acc + mov.amount,
        0,
      );
      const recipient = userState.accounts.find(
        (account) => account.user === data.recipientUser,
      );

      return validateConditions([
        {
          check: !data.amount || +data.amount <= 0,
          message: "Transfer amount must be greater than 0.",
        },
        {
          check: +data.amount > balance,
          message: "Insufficient balance.",
        },
        {
          check: !recipient,
          message: "Recipient does not exist.",
        },
        {
          check: userState.currentUser.user === data.recipientUser,
          message: "You cannot transfer money to yourself!",
        },
      ]);

    case "removeAccount":
      return validateConditions([
        {
          check:
            +data.pin !== userState.currentUser.pin ||
            data.user !== userState.currentUser.user,
          message: "Incorrect information. Please try again.",
        },
      ]);

    default:
      return null;
  }
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

export const generateRelativeDate = (daysOffset) => {
  const date = new Date();

  if (daysOffset > -3) {
    // For 'today', 'yesterday', '2 days ago'
    date.setDate(date.getDate() + daysOffset);
  } else {
    // Ensure dates are always in the past
    const randomFactor = Math.floor(Math.random() * 100) + 20;
    // For dates further back
    date.setDate(date.getDate() + daysOffset * randomFactor);
  }

  return date;
};
