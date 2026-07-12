"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import css from "./Header.module.css";

import Link from "next/link";
import Logo from "../Logo/Logo";
import Icon from "../Icon/Icon";
import MobileMenu from "../MobileMenu/MobileMenu";
import Nav from "../Nav/Nav";
import AuthNav from "@/app/features/auth/components/AuthNav/AuthNav";
import UserNav from "@/app/features/auth/components/UserNav/UserNav";

import { useAppSelector } from "../../redux/hooks";
import Loader from "../Loader/Loader";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const backgroundClass = pathname === "/" ? css.homeBg : css.innerBg;
  const navVariant = pathname === "/" ? "bordered" : "borderedAlt";
  const authVariant = pathname === "/" ? "bordered" : "primary";

  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);

    return () => {
      clearTimeout(timerId);
    };
  }, [pathname]);

  if (isLoading) return <Loader />;

  return (
    <header className={backgroundClass === css.homeBg ? "container" : ""}>
      <div className={`${css.header} ${backgroundClass}`}>
        <Link
          href="/"
          className={css.logoLink}
          aria-label="Go to main page Petlove"
        >
          <Logo />
        </Link>

        <Nav variant={navVariant} />
        {!isAuthenticated ? (
          <AuthNav variant={authVariant} />
        ) : (
          <UserNav
            btnColor={backgroundClass === css.homeBg ? "bordered" : "primary"}
          />
        )}

        <button
          className={css.burgerBtn}
          onClick={() => setIsMenuOpen(true)}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Open mobile menu"
        >
          <Icon iconName="icon-menu" className={css.burgerIcon} />
        </button>

        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}
