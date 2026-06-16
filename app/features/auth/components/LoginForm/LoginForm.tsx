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
        setTimeout(() => {
          window.location.reload();
        }, 100);
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
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className={css.formDescription}>
        Welcome! Please enter your credentials to login to the platform:
      </p>

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
              autoComplete="username email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-login-error" : undefined}
            />
            <span className={css.floatingPlaceholder} aria-hidden="true">
              Email
            </span>
            <div className={css.inputIconContainer}>
              <Icon
                iconName="icon-cross"
                className={`${css.statusIcon} ${css.iconError}`}
                aria-hidden="true"
              />
              <Icon
                iconName="icon-check"
                className={`${css.statusIcon} ${css.iconSuccess}`}
                aria-hidden="true"
              />
            </div>
          </div>
          {errors.email && (
            <span
              id="email-login-error"
              role="alert"
              className={css.errorMessage}
            >
              {errors.email?.message as string}
            </span>
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
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={
                errors.password ? "password-login-error" : undefined
              }
            />
            <span className={css.floatingPlaceholder} aria-hidden="true">
              Password
            </span>
            <div className={css.inputIconContainer}>
              <Icon
                iconName="icon-cross"
                className={`${css.statusIcon} ${css.iconError}`}
                aria-hidden="true"
              />
              <Icon
                iconName="icon-check"
                className={`${css.statusIcon} ${css.iconSuccess}`}
                aria-hidden="true"
              />
              <button
                tabIndex={-1}
                type="button"
                className={css.hideInputbtn}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword
                    ? "Hide password string"
                    : "Show plain text password"
                }
              >
                <Icon
                  iconName={showPassword ? "icon-eye" : "icon-eye-off"}
                  className={css.inputIcon}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
          {errors.password && (
            <span
              id="password-login-error"
              role="alert"
              className={css.errorMessage}
            >
              {errors.password?.message as string}
            </span>
          )}
        </div>
      </div>

      <ActionButton
        color="primary"
        btnStyle="auth"
        type="submit"
        className={css.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging In..." : "Log In"}
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
