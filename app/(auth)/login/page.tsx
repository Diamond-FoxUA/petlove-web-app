import css from "./page.module.css";

import PetBlock from "@/app/shared/components/PetBlock/PetBlock";
import Title from "@/app/shared/components/Title/Title";
import LoginForm from "@/app/features/auth/components/LoginForm/LoginForm";
import { PETBLOCK_IMAGES } from "@/app/assets/images";

export default function Login() {
  const { deskLog, tabLog, mobLog } = PETBLOCK_IMAGES;

  return (
    <div className={`container ${css.wrapper}`}>
      <PetBlock
        mob={mobLog}
        tab={tabLog}
        desk={deskLog}
        alt="A smiling Welsh Corgi on a yellow background."
        isRegister={false}
      />
      <div className={css.formWrapper}>
        <div className={css.formContainer}>
          <Title text="Log in"/>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
