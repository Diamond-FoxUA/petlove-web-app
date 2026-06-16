import css from "./AuthNav.module.css";
import LinkButton from "@/app/shared/components/LinkButton/LinkButton";

type Variant = "primary" | "secondary" | "bordered" | "borderedAlt";

type AuthNavProps = {
  variant?: Variant;
};

export default function AuthNav({ variant }: AuthNavProps) {
  return (
    <div className={css.authGroup}>
      <ul className={css.list}>
        <li className={css.item}>
          <LinkButton
            color={variant ? variant : "primary"}
            btnStyle="auth"
            href="/login"
            className={css.button}
          >
            Log in
          </LinkButton>
        </li>
        <li className={css.item}>
          <LinkButton
            color="secondary"
            btnStyle="auth"
            href="/register"
            className={css.button}
          >
            Registration
          </LinkButton>
        </li>
      </ul>
    </div>
  );
}
