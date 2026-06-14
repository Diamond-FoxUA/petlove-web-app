"use client";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import Icon from "../Icon/Icon";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className={css.backdrop}
      aria-modal="true"
      role="dialog"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <Icon iconName="icon-cross-small" className={css.closeIcon} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
