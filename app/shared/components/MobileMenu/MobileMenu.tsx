"use client";

import { useSyncExternalStore, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import css from "./MobileMenu.module.css";
import Icon from "../Icon/Icon";
import Nav from "../Nav/Nav";
import AuthNav from "@/app/features/auth/components/AuthNav/AuthNav";
import { useAppSelector } from "../../redux/hooks";
import UserNav from "@/app/features/auth/components/UserNav/UserNav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const accentPath = ["/register", "/login", "/news", "/notices", "/friends"];
  const pathname = usePathname();
  const accentClass = accentPath.includes(pathname);

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
    <div
      ref={wrapperRef}
      className={`${css.wrapper} ${isOpen ? css.isOpen : ""} ${accentClass ? css.accentBg : css.whiteBg}`}
    >
      <button
        type="button"
        className={css.closeBtn}
        onClick={onClose}
        aria-label="Close menu"
      >
        <Icon iconName="icon-cross" className={css.crossIcon} />
      </button>

      <div className={css.contentContainer}>
        <Nav variant={accentClass ? "navAlt" : "nav"} />
        {/* Non Auth users */}
        <div>
          {!isAuthenticated ? (
            <AuthNav variant={accentClass ? "bordered" : "primary"} />
          ) : (
            <UserNav />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
// const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

// {!isAuthenticated ? (
//           <AuthNav variant={authVariant} />
//         ) : (
//           <UserNav className={navVariant === "navAlt" ? css.displayNone : ""} />
//         )}
