import Link from "next/link";
import { ReactNode } from "react";
import css from "./LinkButton.module.css";

type ButtonColor = "primary" | "secondary" | "bordered" | "borderedAlt" | "gray";
type ButtonStyle = "auth" | "modal";

type LinkButtonProps = {
  children: ReactNode;
  href: string;
  isActive?: boolean;
  color?: ButtonColor;
  btnStyle?: ButtonStyle;
  className?: string;
};

export default function LinkButton({
  children,
  href,
  isActive,
  color = "primary",
  btnStyle,
  className,
}: LinkButtonProps) {
  const btnClass = [
    css.default,
    css[color],
    btnStyle ? css[btnStyle] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");


  return (
    <Link className={`${btnClass} ${isActive ? css.active : ""}`} href={href}>
      {children}
    </Link>
  );
}
