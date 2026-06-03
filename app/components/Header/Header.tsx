"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import css from "./Header.module.css";
import Link from "next/link";
import Logo from "../Logo/Logo";
import Icon from "../Icon/Icon";
import MobileMenu from "../MobileMenu/MobileMenu";
import Nav from "../Nav/Nav";
import AuthNav from "@/app/features/auth/components/AuthNav/AuthNav";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const backgroundClass = pathname === "/" ? css.homeBg : css.innerBg;
  const navVariant = pathname === "/" ? "bordered" : "nav";
  const authVariant = pathname === "/" ? "bordered" : "primary";

  return (
    <header className="container">
      <div className={`${css.header} ${backgroundClass}`}>
        <Link href="/" className={css.logoLink}>
          <Logo />
        </Link>
        <div className={css.navContainer}>
          <Nav variant={navVariant} />
          <AuthNav variant={authVariant} />
        </div>
        {/*
        <UserNav /> */}
        <button
          className={css.burgerBtn}
          onClick={() => setIsMenuOpen(true)}
          type="button"
        >
          <Icon iconName="icon-menu" className={css.burgerIcon} />
        </button>

        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}
