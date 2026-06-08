import { ComponentProps } from "react";
import css from "./ActionButton.module.css";

type Variant = "primary" | "secondary" | "bordered" | "circle";

type ActionButtonProps = {
  variant?: Variant;
} & ComponentProps<"button">;

export default function ActionButton({
  variant = "primary",
  disabled,
  className = "",
  children,
  ...props
}: ActionButtonProps) {
  
  const buttonClass = [
    css.default,
    css[variant],
    disabled ? css.disabled : "",
    className 
  ].filter(Boolean).join(" ");

  return (
    <button 
      disabled={disabled} 
      className={buttonClass} 
      {...props}
    >
      {children}
    </button>
  );
}
