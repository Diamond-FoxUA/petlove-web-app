import css from "./Nav.module.css";
import LinkButton from "../LinkButton/LinkButton";
import { usePathname } from "next/navigation";

type Variant = "bordered" | "borderedAlt";

type NavProps = {
  variant?: Variant;
  className?: string;
  isMobile?: boolean;
};

export default function Nav({ variant, className, isMobile }: NavProps) {
  const pathname = usePathname();

  const checkActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const isNewsActive = checkActive("/news");
  const isNoticesActive = checkActive("/notices");
  const isFriendsActive = checkActive("/friends");

  return (
    <nav
      aria-label={
        isMobile ? "Mobile main navigation" : "Desktop main navigation"
      }
      className={className || ""}
    >
      <ul className={css.list}>
        <li>
          <LinkButton
            color={variant}
            href="/news"
            isActive={isNewsActive}
            ariaCurrent={isNewsActive ? "page" : undefined}
          >
            News
          </LinkButton>
        </li>
        <li>
          <LinkButton
            color={variant}
            href="/notices"
            isActive={isNoticesActive}
            ariaCurrent={isNoticesActive ? "page" : undefined}
          >
            Find pet
          </LinkButton>
        </li>
        <li>
          <LinkButton
            color={variant}
            href="/friends"
            isActive={isFriendsActive}
            ariaCurrent={isFriendsActive ? "page" : undefined}
          >
            Our friends
          </LinkButton>
        </li>
      </ul>
    </nav>
  );
}
