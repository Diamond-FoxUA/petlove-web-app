"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useEffect, type ReactNode } from "react";
import { getCurrentUserFull } from "@/app/features/auth/model/authSlice";

const AuthInitializer = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    store.dispatch(getCurrentUserFull());
  }, []);

  return <>{children}</>;
};

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
};
