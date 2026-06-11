import ActionButton from "@/app/shared/components/ActionButton/ActionButton";
import { usePathname } from "next/navigation";

type LogoutBtnProps = {
  handleLogout: () => void;
};

export default function LogoutBtn({ handleLogout }: LogoutBtnProps) {
  const pathname = usePathname();

  return (
    <ActionButton
      color={pathname === "/" ? "primary" : "primary"}
      btnStyle="auth"
      onClick={handleLogout}
    >
      Log out
    </ActionButton>
  );
}
