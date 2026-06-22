import css from "./ModalAttention.module.css";

import Modal from "@/app/shared/components/Modal/Modal";
import LinkButton from "@/app/shared/components/LinkButton/LinkButton";

type ModalAttentionProps = {
  onClose: () => void;
};

export default function ModalAttention({ onClose }: ModalAttentionProps) {
  return (
    <Modal onClose={onClose} className={css.modal}>
      <span className={css.modalIcon} aria-hidden="true">
        🐶
      </span>

      <h2 id="modal-headline" className={css.modalTitle}>
        Attention
      </h2>
      <p className={css.modalParagraph}>
        We would like to remind you that certain functionality is available only
        to authorized users.If you have an account, please log in with your
        credentials. If you do not already have an account, you must register to
        access these features.
      </p>

      <div className={css.btnGroup}>
        <LinkButton href="/login" className={css.btn}>
          Log In
        </LinkButton>
        <LinkButton href="/register" color="secondary" className={css.btn}>
          Registration
        </LinkButton>
      </div>
    </Modal>
  );
}
