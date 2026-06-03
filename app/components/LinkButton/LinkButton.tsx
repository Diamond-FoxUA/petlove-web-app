import Link from "next/link";
import { ReactNode } from "react";
import css from "./LinkButton.module.css";

type LinkButtonProps = {
  children: ReactNode;
  href: string;
  isActive?: boolean;
};

export default function LinkButton({
  children,
  href,
  isActive,
}: LinkButtonProps) {
  return (
    <Link
      className={`${css.linkBtn} ${isActive ? css.isActive : ""}`}
      href={href}
    >
      {children}
    </Link>
  );
}
