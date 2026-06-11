import Title from "@/app/shared/components/Title/Title";
import PetBlock from "@/app/shared/components/PetBlock/PetBlock";
import css from "./page.module.css";
import RegistrationForm from "@/app/features/auth/components/RegistrationForm/RegistrationForm";

export default function Register() {
  return (
    <section className={`container ${css.wrapper}`}>
      <PetBlock
        alt="Orange tabby cat on a yellow background."
      />
      <div className={css.formWrapper}>
        <div className={css.formContainer}>
          <Title text="Registration" />
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
