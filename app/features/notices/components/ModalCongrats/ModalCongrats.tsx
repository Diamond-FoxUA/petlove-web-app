import css from "./ModalCongrats.module.css";

import Modal from "@/app/shared/components/Modal/Modal";
import LinkButton from "@/app/shared/components/LinkButton/LinkButton";

type ModalCongratsProps = {
  onClose: () => void;
};

export default function ModalCongrats({ onClose }: ModalCongratsProps) {
  return (
    <Modal onClose={onClose} className={css.container}>
      <span aria-hidden="true" className={css.image}>
        🐈
      </span>
      <h2 id="modal-headline" className={css.title}>
        Congrats
      </h2>
      <p className={css.paragraph}>
        The first fluff in the favorites! May your friendship be the happiest
        and filled with fun.
      </p>
      <LinkButton color="primary" href="/profile" className={css.btn}>
        Go to profile
      </LinkButton>
    </Modal>
  );
}
