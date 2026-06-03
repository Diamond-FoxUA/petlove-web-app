import Link from "next/link";
import { ReactNode } from "react";
import css from "./LinkButton.module.css";

type Variant = "primary" | "secondary" | "bordered" | "nav";

type LinkButtonProps = {
  children: ReactNode;
  href: string;
  isActive?: boolean;
  variant?: Variant;
  className?: string;
};

export default function LinkButton({
  children,
  href,
  isActive,
  variant = "primary",
  className,
}: LinkButtonProps) {
  const btnClass = [css.default, css[variant], className]
    .filter(Boolean)
    .join(" ");
  const activeClass = variant === "primary" || "nav" ? css.isActive : css.isActiveAlt;

  return (
    <Link className={`${btnClass} ${isActive ? activeClass : ""}`} href={href}>
      {children}
    </Link>
  );
}
