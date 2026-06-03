import css from "./Nav.module.css";
import LinkButton from "../LinkButton/LinkButton";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={css.list}>
        <li>
          <LinkButton href="/news" isActive={pathname === "/news"}>
            News
          </LinkButton>
        </li>
        <li>
          <LinkButton href="/friends" isActive={pathname === "/friends"}>
            Find pet
          </LinkButton>
        </li>
        <li>
          <LinkButton href="/notices" isActive={pathname === "/notives"}>
            Our friends
          </LinkButton>
        </li>
      </ul>
    </nav>
  );
}
