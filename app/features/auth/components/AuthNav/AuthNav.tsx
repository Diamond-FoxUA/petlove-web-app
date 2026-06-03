import css from "./AuthNav.module.css";
import LinkButton from "@/app/components/LinkButton/LinkButton";

type Variant = "primary" | "secondary" | "bordered" | "nav";

type AuthNavProps = {
  variant?: Variant;
};

export default function AuthNav({ variant }: AuthNavProps) {
  return (
    <nav aria-label="Authentication" className={css.nav}>
      <ul className={css.list}>
        <li className={css.item}>
          <LinkButton variant={variant} href="/login" className={css.button}>
            Log in
          </LinkButton>
        </li>
        <li className={css.item}>
          <LinkButton variant="secondary" href="/register" className={css.button}>
            Registration
          </LinkButton>
        </li>
      </ul>
    </nav>
  );
}
