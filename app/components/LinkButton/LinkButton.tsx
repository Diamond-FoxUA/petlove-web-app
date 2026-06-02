import Link from "next/link";
import { ReactNode } from "react";
import css from "./LinkButton.module.css";

type LinkButtonProps = {
  children: ReactNode;
  href: string;
}

export default function LinkButton ({ children, href }: LinkButtonProps) {
  return (
    <Link className={css.linkBtn} href={href}>{children}</Link>
  )
}