"use client";
import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();
const initialState = {
  accounts: [
    {
      owner: "Jonas Schmedtmann",
      movements: [
        { date: "10/01/2024", amount: 5000 },
        { date: "10/02/2024", amount: 3400 },
        { date: "10/03/2024", amount: -150 },
        { date: "10/04/2024", amount: -790 },
        { date: "10/05/2024", amount: -3210 },
        { date: "10/06/2024", amount: -1000 },
        { date: "10/07/2024", amount: 8500 },
        { date: "10/08/2024", amount: -30 },
        { date: "10/17/2024", amount: 30 },
      ],
      interestRate: 1.2, // %
      user: "js",
      pin: 1111,
    },
    {
      owner: "Jessica Davis",
      movements: [
        { date: "01/10/2024", amount: 200 },
        { date: "02/10/2024", amount: 1000 },
        { date: "03/10/2024", amount: -1500 },
        { date: "04/10/2024", amount: -90 },
        { date: "05/10/2024", amount: 210 },
        { date: "06/10/2024", amount: -1000 },
        { date: "07/10/2024", amount: 500 },
        { date: "08/10/2024", amount: -300 },
      ],
      interestRate: 1.5,
      user: "jd",
      pin: 2222,
    },
    {
      owner: "Steven Thomas Williams",
      movements: [
        { date: "01/10/2024", amount: 200 },
        { date: "02/10/2024", amount: -200 },
        { date: "03/10/2024", amount: 340 },
        { date: "04/10/2024", amount: -300 },
        { date: "05/10/2024", amount: -20 },
        { date: "06/10/2024", amount: 50 },
        { date: "07/10/2024", amount: 400 },
        { date: "08/10/2024", amount: -460 },
      ],
      interestRate: 0.7,
      pin: 3333,
    },
    {
      owner: "Sarah Smith",
      movements: [
        { date: "01/10/2024", amount: 430 },
        { date: "02/10/2024", amount: 1000 },
        { date: "03/10/2024", amount: 700 },
        { date: "04/10/2024", amount: 50 },
        { date: "05/10/2024", amount: 90 },
      ],
      interestRate: 1,
      pin: 4444,
    },
  ],
  currentUser: null,
};

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
        accounts: [...accounts, state.currentUser],
        currentUser: null,
      };
    case "loan":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          movements: [
            { date: new Date(), amount: Number(action.payload.amount) },
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
