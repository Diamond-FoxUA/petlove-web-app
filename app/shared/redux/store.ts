import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/features/auth/model/authSlice";
import { newsApi } from "@/app/features/news/api/newsApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(newsApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
