"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../shared/components/Loader/Loader";

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.refresh();

    const timerId = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timerId);
  }, [router]);

  return <>{loading ? <Loader /> : children}</>;
}
