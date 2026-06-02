import logo from "@/app/assets/logo/logo-mob@2x.svg";
import css from "./Logo.module.css";

export default function Logo () {
  return (
    <svg className={css.logo} width={76} height={20}>
      <use href={logo.src}></use>
    </svg>
  )
}