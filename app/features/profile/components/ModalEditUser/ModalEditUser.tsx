import css from "./ModalEditUser.module.css";

import Modal from "@/app/shared/components/Modal/Modal";
import EditUserForm from "../EditUserForm/EditUserForm";

type ModalEditUserProps = {
  onClose: () => void;
};

export default function ModalEditUser({ onClose }: ModalEditUserProps) {
  return (
    <Modal onClose={onClose} className={css.modal}>
      <header className={css.modalHeader}>
        <h1 id="modal-headline" className={css.title}>
          Edit information
        </h1>
      </header>

      <EditUserForm onClose={onClose} />
    </Modal>
  );
}
