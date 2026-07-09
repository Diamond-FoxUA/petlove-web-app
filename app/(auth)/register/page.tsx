import css from "./page.module.css";
import { Metadata } from "next";

import Title from "@/app/shared/components/Title/Title";
import PetBlock from "@/app/shared/components/PetBlock/PetBlock";
import RegistrationForm from "@/app/features/auth/components/RegistrationForm/RegistrationForm";

export const metadata: Metadata = {
  title: "Create an Account",
  description:
    "Join Petlove today! Sign up for a free account to create pet showcase profiles, track your pet listings, and explore our community.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Register() {
  return (
    <section className={`container ${css.wrapper}`}>
      <PetBlock alt="Orange tabby cat on a yellow background." />
      <div className={css.formWrapper}>
        <div className={css.formContainer}>
          <Title text="Registration" />
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
