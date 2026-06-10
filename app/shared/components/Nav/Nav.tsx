import css from "./Nav.module.css";
import LinkButton from "../LinkButton/LinkButton";
import { usePathname } from "next/navigation";

type Variant = "primary" | "secondary" | "bordered" | "nav" | "navAlt";

type NavProps = {
  variant?: Variant;
  className?: string;
};

export default function Nav({ variant, className }: NavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={className ? className : ""}>
      <ul className={css.list}>
        <li>
          <LinkButton
            variant={variant}
            href="/news"
            isActive={pathname === "/news"}
          >
            News
          </LinkButton>
        </li>
        <li>
          <LinkButton
            variant={variant}
            href="/friends"
            isActive={pathname === "/friends"}
          >
            Find pet
          </LinkButton>
        </li>
        <li>
          <LinkButton
            variant={variant}
            href="/notices"
            isActive={pathname === "/notices"}
          >
            Our friends
          </LinkButton>
        </li>
      </ul>
    </nav>
  );
}
