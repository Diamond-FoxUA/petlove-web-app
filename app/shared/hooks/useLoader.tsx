"use client";

import { useState, useEffect } from "react";

export default function useLoader(isLoading: boolean) {
  const [showLoader, setShowLoader] = useState(isLoading);
  
  useEffect(() => {
    const timerShowLoader = setTimeout(() => {
      setShowLoader(true);
    }, 0);

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => {
      clearTimeout(timerShowLoader);
      clearTimeout(timer);
    };
  }, [isLoading]);

  return isLoading || showLoader;
}
