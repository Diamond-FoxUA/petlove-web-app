"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ApiError } from "@/app/api/api";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormData, loginSchema } from "../../schemas/authSchema";

import ActionButton from "@/app/shared/components/ActionButton/ActionButton";
import Link from "next/link";
import Icon from "@/app/shared/components/Icon/Icon";
import { toast } from "sonner";

import css from "./LoginForm.module.css";
import { login } from "../../api/authHandler";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<loginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: loginFormData) => {
    try {
      const res = await login(data);
      if (res) {
        router.push("/profile");
        reset();
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      const errorMessage =
        (error as ApiError).response?.data?.error ??
        (error as ApiError).message ??
        "Oops... Something went wrong.";

      toast.error(errorMessage);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <span className={css.formDescription}>
        Welcome! Please enter your credentials to login to the platform:
      </span>
      <div className={css.inputsWrapper}>
        <div>
          <div className={css.inputContainer}>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              className={`${css.input} ${errors.email ? css.inputError : ""}`}
              type="email"
              id="email"
              {...register("email")}
              placeholder=" "
            />
            <span className={css.floatingPlaceholder}>Email</span>
            <div className={css.inputIconContainer}>
              <Icon
                iconName="icon-cross"
                className={`${css.statusIcon} ${css.iconError}`}
              />
              <Icon
                iconName="icon-check"
                className={`${css.statusIcon} ${css.iconSuccess}`}
              />
            </div>
          </div>
          {errors.email && (
            <span className={css.errorMessage}>{errors.email?.message}</span>
          )}
        </div>

        <div>
          <div className={css.inputContainer}>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              className={`${css.input} ${errors.password ? css.inputError : ""}`}
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              placeholder=" "
            />
            <span className={css.floatingPlaceholder}>Password</span>
            <div className={css.inputIconContainer}>
              <Icon
                iconName="icon-cross"
                className={`${css.statusIcon} ${css.iconError}`}
              />
              <Icon
                iconName="icon-check"
                className={`${css.statusIcon} ${css.iconSuccess}`}
              />
              <button
                type="button"
                className={css.hideInputbtn}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Icon
                  iconName={showPassword ? "icon-eye" : "icon-eye-off"}
                  className={css.inputIcon}
                />
              </button>
            </div>
          </div>
          {errors.password && (
            <span className={css.errorMessage}>{errors.password?.message}</span>
          )}
        </div>
      </div>

      <ActionButton
        type="submit"
        className={css.submitBtn}
        disabled={isSubmitting}
      >
        Log In
      </ActionButton>
      <p className={css.loginText}>
        Don’t have an account?&nbsp;
        <Link href="/register" className={css.loginLink}>
          Register
        </Link>
      </p>
    </form>
  );
}
