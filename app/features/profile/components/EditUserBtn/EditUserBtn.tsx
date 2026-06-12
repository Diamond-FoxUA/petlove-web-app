import css from "./EditUserBtn.module.css";

import Icon from "@/app/shared/components/Icon/Icon";

type EditUserBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function EditUserBtn({
  onClick,
  className,
  ...props
}: EditUserBtnProps) {
  return (
    <button
      type="button"
      className={`${css.editUserBtn} ${className ? className : ""}`}
      onClick={onClick}
      aria-label="Edit user profile"
      {...props}
    >
      <Icon iconName="icon-edit" className={css.editUserIcon} />
    </button>
  );
}
