import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/features/auth/model/authSlice";

import { newsApi } from "@/app/features/news/api/newsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
