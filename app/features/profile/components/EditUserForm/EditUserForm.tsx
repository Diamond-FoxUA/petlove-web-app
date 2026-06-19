"use client";
import css from "./EditUserForm.module.css";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

import { editUserSchema } from "../../schemas/editUserSchema";
import { useAppSelector } from "@/app/shared/redux/hooks";

import ActionButton from "@/app/shared/components/ActionButton/ActionButton";
import Icon from "@/app/shared/components/Icon/Icon";

import type { EditUserFormData } from "../../schemas/editUserSchema";

function maskUkrainianPhone(value: string) {
  const digits = value.replace(/[^\d+]/g, "");

  const match = digits.match(/^(\+380)(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);
  if (match) {
    const [, prefix, g1, g2, g3, g4] = match;
    return [
      prefix,
      g1 ? ` ${g1}` : "",
      g2 ? ` ${g2}` : "",
      g3 ? ` ${g3}` : "",
      g4 ? ` ${g4}` : "",
    ]
      .join("")
      .trim();
  }
  return digits;
}

export default function EditUserForm() {
  const { user } = useAppSelector((state) => state.auth);
  const [previewUrl, setPreviewUrl] = useState(user?.avatar || "");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (user?.avatar) {
      timeoutId = setTimeout(() => setPreviewUrl(user.avatar), 1);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user?.avatar]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
    control,
    getValues,
  } = useForm<EditUserFormData>({
    resolver: yupResolver(editUserSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      name: user?.name,
      email: user?.email,
      avatar: user?.avatar || "",
      phone: user?.phone || "",
    },
    values: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
      phone: user?.phone ? user.phone.replace(/\s+/g, "") : "+380",
    },
  });

  const handleApplyPhoto = async () => {
    const isUrlValid = await trigger("avatar");

    if (isUrlValid) {
      const currentUrl = getValues("avatar");
      setPreviewUrl(currentUrl);
    }
  };

  const onSubmit = (data: EditUserFormData) => {
    console.log("Clean data sent to API:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="User profile picture preview"
          className={css.avatarImg}
          width={80}
          height={80}
        />
      ) : (
        <div className={css.avatarPlaceholder}>
          <Icon iconName="icon-user" className={css.userIcon} />
        </div>
      )}

      <div className={css.formContent}>
        <div className={css.inputRow}>
          <div className={css.inputGroup}>
            <label htmlFor="avatar" className="sr-only">
              Profile picture
            </label>
            <input
              {...register("avatar")}
              className={css.input}
              id="avatar"
              type="text"
              aria-invalid={errors.avatar ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="Avatar URL"
            />
            <ActionButton
              type="button"
              color="secondary"
              className={css.photoBtn}
              onClick={handleApplyPhoto}
            >
              Upload photo{" "}
              <Icon iconName="icon-cloud" className={css.cloudIcon} />
            </ActionButton>
          </div>
          {errors.avatar && (
            <p id="name-error" role="alert" className={css.errorMessage}>
              {errors.avatar.message}
            </p>
          )}
        </div>
        <div className={css.inputRow}>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            {...register("name")}
            className={css.input}
            id="name"
            type="text"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Name"
          />
          {errors.name && (
            <p id="name-error" role="alert" className={css.errorMessage}>
              {errors.name.message}
            </p>
          )}
        </div>
        <div className={css.inputRow}>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            {...register("email")}
            className={css.input}
            id="email"
            type="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="Email"
          />
          {errors.email && (
            <p id="email-error" role="alert" className={css.errorMessage}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className={css.inputRow}>
          <label htmlFor="phone" className="sr-only">
            Phone number
          </label>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <input
                className={css.input}
                id="phone"
                type="tel"
                placeholder="+380 00 000 0000"
                maxLength={17}
                value={maskUkrainianPhone(value || "")}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\s+/g, "");
                  onChange(rawValue);
                }}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
            )}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className={css.errorMessage}>
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <ActionButton
        type="submit"
        disabled={isSubmitting}
        className={css.submitBtn}
      >
        {isSubmitting ? "Updating..." : "Update profile"}
      </ActionButton>
    </form>
  );
}
