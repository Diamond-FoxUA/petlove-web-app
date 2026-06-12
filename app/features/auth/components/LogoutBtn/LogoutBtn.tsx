import ActionButton from "@/app/shared/components/ActionButton/ActionButton";

type LogoutBtnProps = {
  handleLogout: () => void;
  color?: "primary" | "secondary" | "bordered";
};

export default function LogoutBtn({ handleLogout, color = "bordered" }: LogoutBtnProps) {

  return (
    <ActionButton
      color={color}
      btnStyle="auth"
      onClick={handleLogout}
    >
      Log out
    </ActionButton>
  );
}
