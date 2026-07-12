"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  registrationFormData,
  registrationSchema,
} from "../../schemas/authSchema";
import css from "./RegistrationForm.module.css";

import ActionButton from "@/app/shared/components/ActionButton/ActionButton";
import Link from "next/link";
import Icon from "@/app/shared/components/Icon/Icon";

import { useState } from "react";
import { register as registerUser } from "../../api/authHandler";
import { useRouter } from "next/navigation";
import { ApiError } from "@/app/api/api";
import { toast } from "sonner";

import { useAppDispatch } from "@/app/shared/redux/hooks";
import { getCurrentUserFull } from "../../model/authSlice";

export default function RegistrationForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<registrationFormData>({
    resolver: yupResolver(registrationSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: registrationFormData) => {
    try {
      const res = await registerUser(data);

      if (res) {
        const profileResult = await dispatch(getCurrentUserFull());

        if (getCurrentUserFull.fulfilled.match(profileResult)) {
          toast.success(`Welcome to Petlove, ${profileResult.payload.name}!`);
          reset();
          router.push("/profile");
        } else {
          const fetchError =
            (profileResult.payload as string) ||
            "Could not initialize profile.";
          toast.error(fetchError);
        }
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
        Thank you for your interest in our platform.
      </p>

      <div className={css.inputsWrapper}>
        <div>
          <div className={css.inputContainer}>
            <label className="sr-only" htmlFor="name">
              Name
            </label>

            <input
              className={`${css.input} ${errors.name ? css.inputError : ""}`}
              id="name"
              {...register("name")}
              type="text"
              placeholder=" "
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            <span className={css.floatingPlaceholder} aria-hidden="true">
              Name
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
          {errors.name && (
            <span id="name-error" role="alert" className={css.errorMessage}>
              {errors.name?.message as string}
            </span>
          )}
        </div>

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
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
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
            <span id="email-error" role="alert" className={css.errorMessage}>
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
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
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
            <span id="password-error" role="alert" className={css.errorMessage}>
              {errors.password?.message as string}
            </span>
          )}
        </div>

        <div>
          <div className={css.inputContainer}>
            <label className="sr-only" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={`${css.input} ${errors.confirmPassword ? css.inputError : ""}`}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder=" "
              {...register("confirmPassword")}
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={
                errors.confirmPassword ? "confirmPassword-error" : undefined
              }
            />
            <span className={css.floatingPlaceholder} aria-hidden="true">
              Confirm password
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
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirmation string"
                    : "Show plain text confirmation password"
                }
              >
                <Icon
                  iconName={showConfirmPassword ? "icon-eye" : "icon-eye-off"}
                  className={css.inputIcon}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
          {errors.confirmPassword && (
            <span
              id="confirmPassword-error"
              role="alert"
              className={css.errorMessage}
            >
              {errors.confirmPassword?.message as string}
            </span>
          )}
        </div>
      </div>

      <ActionButton
        type="submit"
        color="primary"
        btnStyle="auth"
        className={css.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registering..." : "Registration"}
      </ActionButton>
      <p className={css.loginText}>
        Already have an account?&nbsp;
        <Link href="/login" className={css.loginLink}>
          Login
        </Link>
      </p>
    </form>
  );
}
