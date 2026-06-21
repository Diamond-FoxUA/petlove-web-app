"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { getCurrentUserFull } from "@/app/features/auth/model/authSlice";

const AuthInitializer = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUserFull());
  }, [dispatch]);

  return <>{children}</>;
};

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  const [currentStore] = useState(() => makeStore());

  return (
    <Provider store={currentStore}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
};
