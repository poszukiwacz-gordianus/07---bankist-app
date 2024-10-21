"use client";
import { createContext, useContext, useReducer } from "react";
import { generateDateFromToday } from "../_lib/helpers";

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
      movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    },
    {
      owner: "Jessica Davis",
      user: "jd",
      pin: 2222,
      currency: "USD",
      locale: "en-US",
      interestRate: 1.5,
      movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    },
  ],
  currentUser: null,
  balance() {
    return this.accounts.map(
      (account) =>
        (account.balance = account.movements.reduce(
          (acc, mov) => acc + mov,
          0,
        )),
    );
  },
  createDates() {
    return this.accounts.map(
      (account) =>
        (account.movements = account.movements.map((mov, i) => ({
          date: generateDateFromToday(-i),
          amount: mov,
        }))),
    );
  },
  sessionCounter: SESSION_COUNTER,
};
initialState.balance();
initialState.createDates();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      const currentUser = state.accounts.find(
        (account) =>
          account.user === action.payload.user &&
          account.pin === +action.payload.pin,
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
            {
              date: new Date(),
              amount: Math.floor(action.payload.amount),
            },
            ...state.currentUser.movements,
          ],
        },
      };

    case "transfer":
      const amount = +action.payload.amount;
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
