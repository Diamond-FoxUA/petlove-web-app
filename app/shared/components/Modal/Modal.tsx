"use client";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import Icon from "../Icon/Icon";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={css.backdrop}
      onCancel={handleCancel}
      onClick={handleDialogClick}
      aria-labelledby="modal-headline"
    >
      <div className={css.modal}>
        <button
          className={css.closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close modal dialog"
        >
          <Icon
            iconName="icon-cross-small"
            className={css.closeIcon}
            aria-hidden="true"
          />
        </button>
        {children}
      </div>
    </dialog>,
    document.body,
  );
}
