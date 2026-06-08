"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  registrationFormData,
  registrationSchema,
} from "../../schemas/registrationSchema";
import css from "./RegistrationForm.module.css";
import ActionButton from "@/app/shared/components/ActionButton/ActionButton";
import Link from "next/link";
import Icon from "@/app/shared/components/Icon/Icon";
import { ChangeEvent, useState } from "react";
import { register as registerUser } from "../../server/registerHandler";
import { useRouter } from "next/navigation";
import { ApiError } from "@/app/api/api";
import { toast } from "sonner";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<registrationFormData>({
    resolver: yupResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formValues = watch();

  const [interactedFields, setInteractedFields] = useState<
    Record<string, boolean>
  >({});

  const handleFieldInteraction = (fieldName: keyof registrationFormData) => {
    if (!interactedFields[fieldName]) {
      setInteractedFields((prev) => ({ ...prev, [fieldName]: true }));
    }
  };

  const getInputClass = (fieldName: keyof registrationFormData) => {
    if (errors[fieldName]) {
      return `${css.input} ${css.inputError}`;
    }
    if (formValues[fieldName] && formValues[fieldName].length > 0) {
      return `${css.input} ${css.inputSuccess}`;
    }
    return css.input;
  };

  const renderInputIcon = (fieldName: keyof registrationFormData) => {
    if (!interactedFields[fieldName]) return null;

    const hasError = !!errors[fieldName];
    if (hasError) {
      return (
        <Icon
          iconName="icon-cross"
          className={`${css.statusIcon} ${css.statusIconError}`}
        />
      );
    } else {
      return (
        <Icon
          iconName="icon-check"
          className={`${css.statusIcon} ${css.statusIconSuccess}`}
        />
      );
    }
  };

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: registrationFormData) => {
    try {
      const res = await registerUser(data);
      if (res) {
        router.push("/profile");
        reset();
        setInteractedFields({});
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

  const registerWithInteraction = (fieldName: keyof registrationFormData) => {
    const registered = register(fieldName);
    return {
      ...registered,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleFieldInteraction(fieldName);
        return registered.onChange(e);
      },
    };
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
              className={getInputClass("name")}
              id="name"
              {...registerWithInteraction("name")}
              type="text"
              placeholder="Name"
            />
            <div className={css.inputIconContainer}>
              {renderInputIcon("name")}
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
              className={getInputClass("email")}
              type="email"
              id="email"
              {...registerWithInteraction("email")}
              placeholder="Email"
            />
            <div className={css.inputIconContainer}>
              {renderInputIcon("email")}
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
              className={getInputClass("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              {...registerWithInteraction("password")}
              placeholder="Password"
            />
            <div className={css.inputIconContainer}>
              {renderInputIcon("password")}
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
              className={getInputClass("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm password"
              {...registerWithInteraction("confirmPassword")}
            />
            <div className={css.inputIconContainer}>
              {renderInputIcon("confirmPassword")}
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
