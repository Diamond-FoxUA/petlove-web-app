"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useEffect, type ReactNode } from "react";
import { refreshCurrentUser } from "@/app/features/auth/model/authSlice";

const AuthInitializer = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    store.dispatch(refreshCurrentUser());
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
