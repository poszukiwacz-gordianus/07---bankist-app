"use client";
import { createContext, useContext, useReducer } from "react";
import { generateRelativeDate } from "../_lib/helpers";

const UserAccountContext = createContext();
const SESSION_COUNTER = 10 * 60;
const initialState = {
  accounts: [
    {
      owner: "Gord The Finder",
      user: "gtf",
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
  calculateBalances() {
    return this.accounts.map(
      (account) =>
        (account.balance = account.movements.reduce(
          (acc, mov) => acc + mov,
          0,
        )),
    );
  },
  generateMovementDates() {
    return this.accounts.map(
      (account) =>
        (account.movements = account.movements.map((mov, i) => ({
          date: generateRelativeDate(-i),
          amount: mov,
        }))),
    );
  },
  sessionCounter: SESSION_COUNTER,
};
initialState.calculateBalances();
initialState.generateMovementDates();

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
    case "addLoanMovement":
      const loanAmount = Math.floor(action.payload.amount);
      return {
        ...state,
        sessionCounter: SESSION_COUNTER,
        currentUser: {
          ...state.currentUser,
          balance: state.currentUser.balance + loanAmount,
          movements: [
            {
              date: new Date(),
              amount: loanAmount,
            },
            ...state.currentUser.movements,
          ],
        },
      };

    case "addTransferMovement":
      const transferAmount = +action.payload.amount;
      const otherAccounts = state.accounts.filter(
        (account) => account.user != action.payload.recipientUser,
      );
      const recipientAccount = state.accounts.find(
        (account) => account.user === action.payload.recipientUser,
      );
      const updatedRecipientAccount = {
        ...recipientAccount,
        movements: [
          { date: new Date(), transferAmount },
          ...recipientAccount.movements,
        ],
      };

      return {
        ...state,
        sessionCounter: SESSION_COUNTER,
        accounts: [...otherAccounts, updatedRecipientAccount],
        currentUser: {
          ...state.currentUser,
          balance: state.currentUser.balance - transferAmount,
          movements: [
            { date: new Date(), amount: -transferAmount },
            ...state.currentUser.movements,
          ],
        },
      };

    case "removeAccount":
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
    <UserAccountContext.Provider value={{ state, dispatch }}>
      {children}
    </UserAccountContext.Provider>
  );
}

function useUserAccount() {
  const context = useContext(UserAccountContext);
  if (context === undefined)
    throw new Error(
      "UserAccountContext was used outside of UserAccountContextProvider",
    );
  return context;
}

export { UserProvider, useUserAccount };
