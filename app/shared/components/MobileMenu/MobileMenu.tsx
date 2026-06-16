"use client";

import { useSyncExternalStore, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

import css from "./MobileMenu.module.css";
import Icon from "../Icon/Icon";
import Nav from "../Nav/Nav";
import AuthNav from "@/app/features/auth/components/AuthNav/AuthNav";
import UserNav from "@/app/features/auth/components/UserNav/UserNav";
import { useAppSelector } from "../../redux/hooks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const accentPath = ["/register", "/login", "/news", "/notices", "/friends", "/profile"];
  const pathname = usePathname();
  const accentClass = accentPath.includes(pathname);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const isMounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <aside
      id="mobile-menu"
      ref={wrapperRef}
      aria-hidden={!isOpen}
      className={`${css.wrapper} ${isOpen ? css.isOpen : ""} ${accentClass ? css.accentBg : css.whiteBg}`}
    >
      <button
        type="button"
        className={css.closeBtn}
        onClick={onClose}
        aria-label="Close mobile menu"
      >
        <Icon iconName="icon-cross-small" className={css.crossIcon} />
      </button>

      <div className={css.contentContainer}>
        <Nav variant={accentClass ? "bordered" : "borderedAlt"} isMobile/>
        {!isAuthenticated ? <AuthNav /> : <UserNav btnColor={accentClass ? "secondary" : "primary"} />}
      </div>
    </aside>,
    document.body,
  );
}
