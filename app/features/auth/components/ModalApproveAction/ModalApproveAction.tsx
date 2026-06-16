import css from "./ModalApproveAction.module.css";
import Modal from "@/app/shared/components/Modal/Modal";
import ActionButton from "@/app/shared/components/ActionButton/ActionButton";
import { useAppDispatch } from "@/app/shared/redux/hooks";
import { useRouter } from "next/navigation";
import { signoutUser } from "../../model/authSlice";
import { ApiError } from "@/app/api/api";
import { toast } from "sonner";

type ModalApproveActionProps = {
  onClose: () => void;
};

export default function ModalApproveAction({
  onClose,
}: ModalApproveActionProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignout = async () => {
    try {
      await dispatch(signoutUser()).unwrap();

      onClose();
      router.push("/");
    } catch (error) {
      const axiosError = error as ApiError;
      console.error("Signout error: ", error);

      const errorMessage =
        axiosError.response?.data.error ??
        axiosError.message ??
        "Something went wrong. Please try again.";

      toast.error(errorMessage);
    }
  };

  return (
    <Modal onClose={onClose}>
      <span className={css.modalIcon} aria-hidden="true">
        🐈
      </span>
      <h2 id="modal-headline" className={css.title}>
        Already leaving?
      </h2>
      <div className={css.btnContainer}>
        <ActionButton
          btnStyle="modal"
          onClick={handleSignout}
          className={css.btn}
          aria-label="Confirm log out and leave the platform"
        >
          Yes
        </ActionButton>
        <ActionButton
          btnStyle="modal"
          color="gray"
          onClick={onClose}
          className={css.btn}
          aria-label="Close modal"
        >
          Cancel
        </ActionButton>
      </div>
    </Modal>
  );
}
