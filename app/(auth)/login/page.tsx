import css from "./page.module.css";
import { Metadata } from "next";

import PetBlock from "@/app/shared/components/PetBlock/PetBlock";
import Title from "@/app/shared/components/Title/Title";
import LoginForm from "@/app/features/auth/components/LoginForm/LoginForm";

export const metadata: Metadata = {
  title: "Log In",
  description:
    "Welcome back to Petlove! Log in to manage your account, view your pet profiles, and connect with our pet community.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Login() {
  return (
    <section className={`container ${css.wrapper}`}>
      <PetBlock
        alt="A smiling Welsh Corgi on a yellow background."
        isRegister={false}
      />
      <div className={css.formWrapper}>
        <div className={css.formContainer}>
          <Title text="Log in" />
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
