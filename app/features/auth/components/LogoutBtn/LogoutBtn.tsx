import ActionButton from "@/app/shared/components/ActionButton/ActionButton";

type LogoutBtnProps = {
  handleLogout: () => void;
  color?: "primary" | "secondary" | "bordered";
};

export default function LogoutBtn({ handleLogout, color = "bordered" }: LogoutBtnProps) {

  return (
    <ActionButton
      type="button"
      color={color}
      btnStyle="auth"
      onClick={handleLogout}
      aria-label="Log out of your Petlove account"
    >
      Log out
    </ActionButton>
  );
}
