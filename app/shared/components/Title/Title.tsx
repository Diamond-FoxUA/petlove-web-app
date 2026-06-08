import css from "./Title.module.css";

type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  return (
    <>
      <h1 className={css.heading}>{text}</h1>
    </>
  );
}
