import css from "./Nav.module.css";
import LinkButton from "../LinkButton/LinkButton";
import { usePathname } from "next/navigation";

type Variant = "bordered" | "borderedAlt";

type NavProps = {
  variant?: Variant;
  className?: string;
};

export default function Nav({ variant, className }: NavProps) {
  const pathname = usePathname();

  const checkActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav aria-label="Main" className={className || ""}>
      <ul className={css.list}>
        <li>
          <LinkButton 
            color={variant} 
            href="/news" 
            isActive={checkActive("/news")}
          >
            News
          </LinkButton>
        </li>
        <li>
          <LinkButton 
            color={variant} 
            href="/notices" 
            isActive={checkActive("/notices")}
          >
            Find pet
          </LinkButton>
        </li>
        <li>
          <LinkButton 
            color={variant} 
            href="/friends" 
            isActive={checkActive("/friends")}
          >
            Our friends
          </LinkButton>
        </li>
      </ul>
    </nav>
  );
}
