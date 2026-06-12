"use client";

import css from "./UserBlock.module.css";
import Image from "next/image";

import Icon from "@/app/shared/components/Icon/Icon";
import EditUserBtn from "../EditUserBtn/EditUserBtn";

import { useAppSelector } from "@/app/shared/redux/hooks";

export default function UserBlock() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className={css.userBlock}>
      <div className={css.avatarContainer}>
        <span className={css.userTag}>
          User <Icon iconName="icon-user" className={css.iconUser} />
        </span>
        {user?.avatar ? (
          <Image
            className={css.userAvatar}
            width={94}
            height={94}
            src={user?.avatar}
            alt="Profile avatar"
          />
        ) : (
          <EditUserBtn iconName="icon-user" className={css.editUserAvatarBtn} />
        )}
      </div>

      <h2 className={css.heading}>My information</h2>

      <div className={css.infoContainer}>
        <span className={user?.name ? css.inputActive : css.input}>
          {user?.name || "Name"}
        </span>
        <span className={user?.email ? css.inputActive : css.input}>
          {user?.email || "name@mail.com"}
        </span>
        <span className={user?.phone ? css.inputActive : css.input}>
          {user?.phone || "+380"}
        </span>
      </div>
    </div>
  );
}
