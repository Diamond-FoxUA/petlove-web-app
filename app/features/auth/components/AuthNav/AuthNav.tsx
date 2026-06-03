import ActionButton from "@/app/components/ActionButton/ActionButton";
import css from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <li className={css.item}>
          <ActionButton type="button" className={css.button}>Log in</ActionButton>
        </li>
        <li className={css.item}>
          <ActionButton type="button" variant="secondary" className={css.button}>Registration</ActionButton>
        </li>
      </ul>
    </nav>
  );
}
