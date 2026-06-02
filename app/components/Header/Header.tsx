"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import css from "./Header.module.css";
import Link from "next/link";
import Logo from "../Logo/Logo";
import Icon from "../Icon/Icon";
import MobileMenu from "../MobileMenu/MobileMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <button
          className={css.burgerBtn}
          onClick={() => setIsMenuOpen(true)}
          type="button"
        >
          <Icon iconName="icon-menu" size={32} />
        </button>

        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}
