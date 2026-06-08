import Title from "@/app/shared/components/Title/Title";
import PetBlock from "@/app/shared/components/PetBlock/PetBlock";
import { PETBLOCK_IMAGES } from "@/app/assets/images";
import css from "./page.module.css";
import RegistrationForm from "@/app/features/auth/components/RegistrationForm/RegistrationForm";

export default function Register() {
  const { mobReg, tabReg, deskReg } = PETBLOCK_IMAGES;
  return (
    <div className={`container ${css.wrapper}`}>
      <PetBlock
        alt="Orange tabby cat on a yellow background."
        mob={mobReg}
        tab={tabReg}
        desk={deskReg}
      />
      <div className={css.formWrapper}>
        <div className={css.formContainer}>
          <Title text="Registration" />
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
