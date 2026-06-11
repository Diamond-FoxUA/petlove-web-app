import { ComponentProps } from "react";
import css from "./ActionButton.module.css";

type ButtonColor = "primary" | "secondary" | "bordered" | "gray";
type ButtonStyle = "auth" | "modal";

type ActionButtonProps = {
  color?: ButtonColor;
  btnStyle?: ButtonStyle;
} & ComponentProps<"button">;

export default function ActionButton({
  color = "primary",
  btnStyle,
  disabled,
  className = "",
  children,
  ...props
}: ActionButtonProps) {

  const buttonClass = [
    css.default,
    css[color],     
    btnStyle ? css[btnStyle] : "", 
    disabled ? css.disabled : "",
    className
  ].filter(Boolean).join(" ");

  return (
    <button disabled={disabled} className={buttonClass} {...props}>
      {children}
    </button>
  );
}
