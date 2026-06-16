import Link from "next/link";
import { ReactNode } from "react";
import css from "./LinkButton.module.css";

type ButtonColor =
  | "primary"
  | "secondary"
  | "bordered"
  | "borderedAlt"
  | "gray";
type ButtonStyle = "auth" | "modal";

type LinkButtonProps = {
  children: ReactNode;
  href: string;
  isActive?: boolean;
  color?: ButtonColor;
  btnStyle?: ButtonStyle;
  className?: string;
  ariaCurrent?: "page";
};

export default function LinkButton({
  children,
  href,
  isActive,
  color = "primary",
  btnStyle,
  className,
  ariaCurrent,
}: LinkButtonProps) {
  const btnClass = [
    css.default,
    css[color],
    btnStyle ? css[btnStyle] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const activeClass = color === "bordered" ? css.active : css.activeAlt;

  return (
    <Link
      className={`${btnClass} ${isActive ? activeClass : ""}`}
      href={href}
      aria-current={ariaCurrent}
    >
      {children}
    </Link>
  );
}
