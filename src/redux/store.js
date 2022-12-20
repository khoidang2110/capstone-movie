import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import movies from "./slices/moviesSlice";
import theaters from "./slices/theatersSlice";
import tickets from "./slices/ticketsSlice";
import account from "./slices/accountSlice";
import admin from "./slices/adminSlice";

const store = configureStore({
  reducer: {
    movies: movies,
    theaters: theaters,
    auth: authSlice,
    tickets: tickets,
    account: account,
    admin: admin,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
