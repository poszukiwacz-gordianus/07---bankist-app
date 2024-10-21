"use client";
import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();
const SESSION_COUNTER = 10 * 60;
const initialState = {
  accounts: [
    {
      owner: "Jonas Schmedtmann",
      user: "js",
      pin: 1111,
      currency: "EUR",
      locale: "pt-PT",
      interestRate: 1.2,
      movements: [
        { date: "2024-07-30T10:30:10.456Z", amount: 200 },
        { date: "2024-07-26T12:01:20.894Z", amount: 455.23 },
        { date: "2024-07-25T17:55:25.234Z", amount: -306.5 },
        { date: "2024-07-20T13:45:50.678Z", amount: 25000 },
        { date: "2024-07-15T09:05:15.012Z", amount: -642.21 },
        { date: "2024-07-10T14:35:00.789Z", amount: -133.9 },
        { date: "2024-07-05T11:25:45.456Z", amount: 79.97 },
        { date: "2024-07-01T08:15:30.123Z", amount: 1300 },
      ],
    },
    {
      owner: "Jessica Davis",
      user: "jd",
      pin: 2222,
      currency: "USD",
      locale: "en-US",
      interestRate: 1.5,
      movements: [
        { date: "2024-08-10T15:00:00.000Z", amount: 5000 },
        { date: "2024-07-10T14:00:00.000Z", amount: 3400 },
        { date: "2024-06-10T13:00:00.000Z", amount: -150 },
        { date: "2024-05-10T12:00:00.000Z", amount: -790 },
        { date: "2024-04-10T11:00:00.000Z", amount: -3210 },
        { date: "2024-03-10T10:00:00.000Z", amount: -1000 },
        { date: "2024-02-10T09:00:00.000Z", amount: 8500 },
        { date: "2024-01-10T08:00:00.000Z", amount: -30 },
      ],
    },
  ],
  currentUser: null,
  balance() {
    return this.accounts.map(
      (account) =>
        (account.balance = account.movements.reduce(
          (acc, mov) => acc + mov.amount,
          0,
        )),
    );
  },
  sessionCounter: SESSION_COUNTER,
};
initialState.balance();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      const currentUser = state.accounts.find(
        (account) =>
          account.user === action.payload.user &&
          account.pin === Number(action.payload.pin),
      );
      return { ...state, currentUser };
    case "logout":
      const accounts = state.accounts.filter(
        (account) => account.user != state.currentUser.user,
      );
      return {
        ...state,
        accounts: [...accounts, state.currentUser],
        currentUser: null,
      };
    case "loan":
      return {
        ...state,
        sessionCounter: SESSION_COUNTER,
        currentUser: {
          ...state.currentUser,
          movements: [
            { date: new Date(), amount: Math.floor(action.payload.amount) },
            ...state.currentUser.movements,
          ],
        },
      };

    case "transfer":
      const amount = Number(action.payload.amount);
      const x = state.accounts.filter(
        (account) => account.user != action.payload.recipientUser,
      );
      const y = state.accounts.find(
        (account) => account.user === action.payload.recipientUser,
      );
      const transfer = {
        ...y,
        movements: [{ date: new Date(), amount }, ...y?.movements],
      };

      return {
        ...state,
        sessionCounter: SESSION_COUNTER,
        accounts: [...x, transfer],
        currentUser: {
          ...state.currentUser,
          movements: [
            { date: new Date(), amount: -amount },
            ...state.currentUser.movements,
          ],
        },
      };

    case "closeAccount":
      const data = state.accounts.filter(
        (account) =>
          account.user !== action.payload.user &&
          account.pin !== action.payload.pin,
      );

      return {
        ...state,
        accounts: [...data],
        currentUser: null,
      };

    default:
      return state;
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside of UserContextProvider");
  return context;
}

export { UserProvider, useUser };
