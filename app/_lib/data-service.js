import { accounts } from "@/public/data";

export function getUser(user, pin) {
  const data = accounts.find(
    (account) => account.user === user && account.pin === pin,
  );

  const currentUser = {
    owner: data.owner,
    interestRate: data.interestRate,
    movements: data.movements.reverse(),
  };

  return currentUser;
}
