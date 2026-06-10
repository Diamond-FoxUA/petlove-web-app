"use client";
import { useState } from "react";

import UserBar from "../UserBar/UserBar";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import css from "./UserNav.module.css";

export default function UserNav({ className }: { className?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav aria-label="User" className={className ? className : ""}>
        <ul className={css.list}>
          <li>
            <UserBar />
          </li>
          <li>
            <LogoutBtn handleLogout={() => setIsModalOpen(true)} />
          </li>
        </ul>
      </nav>

      {isModalOpen && (
        <ModalApproveAction onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
