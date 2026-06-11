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

export default function RegistrationForm() {
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

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: registrationFormData) => {
    try {
      const res = await registerUser(data);
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
        Thank you for your interest in our platform.
      </span>
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
            />
            <span className={css.floatingPlaceholder}>Name</span>
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
          {errors.name && (
            <span className={css.errorMessage}>{errors.name?.message}</span>
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
            />
            <span className={css.floatingPlaceholder}>Confirm password</span>
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
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <Icon
                  iconName={showConfirmPassword ? "icon-eye" : "icon-eye-off"}
                  className={css.inputIcon}
                />
              </button>
            </div>
          </div>
          {errors.confirmPassword && (
            <span className={css.errorMessage}>
              {errors.confirmPassword?.message}
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
        Registration
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
