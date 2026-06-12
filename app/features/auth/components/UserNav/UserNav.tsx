"use client";
import { useState } from "react";

import UserBar from "../UserBar/UserBar";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import css from "./UserNav.module.css";

type UserNavProps = {
  btnColor?: "primary" | "secondary" | "bordered";
}

export default function UserNav({ btnColor }: UserNavProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav aria-label="User">
        <ul className={css.list}>
          <li>
            <UserBar />
          </li>
          <li>
            <LogoutBtn color={btnColor} handleLogout={() => setIsModalOpen(true)} />
          </li>
        </ul>
      </nav>

      {isModalOpen && (
        <ModalApproveAction onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
