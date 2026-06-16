"use client";

import css from "./UserBlock.module.css";
import Image from "next/image";

import Icon from "@/app/shared/components/Icon/Icon";
import EditUserBtn from "../EditUserBtn/EditUserBtn";

import { useAppSelector } from "@/app/shared/redux/hooks";

export default function UserBlock() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <section className={css.userBlock} aria-labelledby="user-info-title">
      <div className={css.avatarContainer}>
        <span className={css.userTag} aria-hidden="true">
          User <Icon iconName="icon-user" className={css.iconUser} />
        </span>
        {user?.avatar ? (
          <Image
            className={css.userAvatar}
            width={94}
            height={94}
            src={user?.avatar}
            alt={`${user?.name || "User"}'s profile avatar`}
          />
        ) : (
          <EditUserBtn
            iconName="icon-user"
            className={css.editUserAvatarBtn}
            aria-label="Upload profile avatar"
          />
        )}
      </div>

      <h2 className={css.heading} id="user-info-title">My information</h2>

      <dl className={css.infoContainer}>
        <div>
          <dt className="sr-only">Name</dt>
          <dd className={user?.name ? css.inputActive : css.input}>
            {user?.name || "Name"}
          </dd>
        </div>

        <div>
          <dt className="sr-only">Email address</dt>
          <dd className={user?.email ? css.inputActive : css.input}>
            {user?.email || "name@mail.com"}
          </dd>
        </div>

        <div>
          <dt className="sr-only">Phone number</dt>
          <dd className={user?.phone ? css.inputActive : css.input}>
            {user?.phone || "+380"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
