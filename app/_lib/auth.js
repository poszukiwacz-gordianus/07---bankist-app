const { getUser } = require("./data-service");

export function login({ user, pin }) {
  const isUser = getUser(user, Number(pin));

  if (!isUser) return false;

  return isUser;
}
