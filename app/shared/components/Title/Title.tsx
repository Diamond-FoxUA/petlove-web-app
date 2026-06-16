import { ComponentProps } from "react";
import css from "./Title.module.css";

type TitleProps = {
  text: string;
} & ComponentProps<"h1">;

export default function Title({ text, ...props }: TitleProps) {
  return (
    <h1 className={css.heading} {...props}>
      {text}
    </h1>
  );
}
