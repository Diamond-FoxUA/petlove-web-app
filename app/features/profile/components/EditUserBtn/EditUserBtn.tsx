import css from "./EditUserBtn.module.css";

import Icon from "@/app/shared/components/Icon/Icon";

type EditUserBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconName: string;
};

export default function EditUserBtn({
  onClick,
  className,
  iconName,
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
      <Icon iconName={iconName} className={css.editUserIcon} />
    </button>
  );
}
