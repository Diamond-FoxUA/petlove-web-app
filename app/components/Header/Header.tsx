'use client';
import { usePathname } from "next/navigation";
import css from "./Header.module.css";
import Link from "next/link";
import Logo from "../Logo/Logo";
import Icon from "../Icon/Icon";

export default function Header() {
  const pathname = usePathname();
  const backgroundClass = pathname === "/" ? css.homeBg : css.innerBg;

  return (
    <header className="container">
      <div className={`${css.header} ${backgroundClass}`}>
        <Link href="/" className={css.logoLink}>
          <Logo />
        </Link>
        {/* <Nav />
        <AuthNav />
        <UserNav /> */}
        <button className={css.burgerBtn} type="button">
          <Icon iconName="icon-menu" size={32} />
        </button>
      </div>
    </header>
  );
}
