import Link from "next/link";
import Image from "next/image";
import css from "./UserBar.module.css";
import { useAppSelector } from "@/app/shared/redux/hooks";
import Icon from "@/app/shared/components/Icon/Icon";

export default function UserBar() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className={css.userBar}>
      <Link href="/profile" className={css.profileLink}>
        {user?.avatar ? (
          <Image
            src={user?.avatar}
            alt="User avatar"
            className={css.avatarImg}
          />
        ) : (
          <Icon iconName="icon-user" className={css.iconUser} />
        )}
      </Link>
      <span className={css.profileUsername}>{user?.name}</span>
    </div>
  );
}
