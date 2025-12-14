import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import { admin } from "../services/admin";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [admin.reducerPath]: admin.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, admin.middleware),
});
