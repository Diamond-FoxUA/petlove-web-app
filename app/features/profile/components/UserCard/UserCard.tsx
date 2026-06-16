"use client";

import css from "./UserCard.module.css";
import { useState } from "react";

import EditUserBtn from "../EditUserBtn/EditUserBtn";
import UserBlock from "../UserBlock/UserBlock";
import PetsBlock from "../PetsBlock/PetsBlock";
import LogoutBtn from "@/app/features/auth/components/LogoutBtn/LogoutBtn";
import ModalApproveAction from "@/app/features/auth/components/ModalApproveAction/ModalApproveAction";

export default function UserCard() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <article className={css.userCardContainer}>
      <EditUserBtn
        className={css.editUserBtn}
        iconName="icon-edit"
        onClick={() => setIsEditModalOpen(true)}
        aria-label="Edit your user profile data"
      />

      <UserBlock />
      <PetsBlock />

      <LogoutBtn
        color="secondary"
        handleLogout={() => setIsLogoutModalOpen(true)}
      />

      {isLogoutModalOpen && (
        <ModalApproveAction onClose={() => setIsLogoutModalOpen(false)} />
      )}

      {/* {isEditModalOpen && (
        <ModalEditUser onClose={() => setIsEditModalOpen(false)}/>
      )} */}
    </article>
  );
}
