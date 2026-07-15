"use client";
import css from "./EditUserForm.module.css";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import imageCompression from "browser-image-compression";

import { editUserSchema } from "../../schemas/editUserSchema";
import { useAppSelector, useAppDispatch } from "@/app/shared/redux/hooks";
import { updateUser } from "../../model/profileSlice";
import { uploadToCloudinary } from "@/app/shared/api/cloudinary";

import ActionButton from "@/app/shared/components/ActionButton/ActionButton";
import Icon from "@/app/shared/components/Icon/Icon";

import type { EditUserFormData } from "../../schemas/editUserSchema";
import { toast } from "sonner";

type EditUserFormProps = {
  onClose: () => void;
};

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

export default function EditUserForm({ onClose }: EditUserFormProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [previewUrl, setPreviewUrl] = useState(user?.avatar || "");
  const [rawFile, setRawFile] = useState<File | null>(null);

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
    trigger,
    control,
    getValues,
    setValue,
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

  const handleUrlBlur = async () => {
    const isUrlValid = await trigger("avatar");

    if (isUrlValid) {
      const currentUrl = getValues("avatar");

      if (
        currentUrl &&
        (currentUrl.startsWith("http://") || currentUrl.startsWith("https://"))
      ) {
        setPreviewUrl(currentUrl);
        setRawFile(null);
      }
    } else {
      setPreviewUrl("");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRawFile(file);

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    setValue("avatar", localUrl, { shouldValidate: true });
  };

  const onSubmit = async (data: EditUserFormData) => {
    try {
      let finalAvatarUrl = data.avatar;

      if (rawFile) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(rawFile, options);
        const uploadedUrl = await uploadToCloudinary(compressedFile);

        if (!uploadedUrl) {
          toast.error("Failed to upload avatar image.");
          return;
        }
        finalAvatarUrl = uploadedUrl;
      }

      const finalData = { ...data, avatar: finalAvatarUrl };

      await dispatch(updateUser(finalData)).unwrap();
      onClose();

      toast.success("Profile updated successfully!");
      setRawFile(null);
    } catch (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : "Something went wrong while updating profile.";
      toast.error(errorMessage);
      console.error(error);
    }
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
          unoptimized
        />
      ) : (
        <div className={css.avatarPlaceholder}>
          <Icon iconName="icon-user" className={css.userIcon} />
        </div>
      )}

      <div className={css.formContent}>
        <div className={css.inputRow}>
          <div
            className={css.inputGroup}
            style={{ display: "flex", gap: "8px", width: "100%" }}
          >
            <label htmlFor="avatar" className="sr-only">
              Profile picture
            </label>

            <input
              className={css.input}
              id="avatar"
              type="text"
              placeholder="Avatar URL"
              aria-invalid={errors.avatar ? "true" : "false"}
              aria-describedby={errors.avatar ? "avatar-error" : undefined}
              {...register("avatar", {
                onBlur: () => {
                  handleUrlBlur();
                },
              })}
              style={{ flexGrow: 1 }}
            />

            <label
              htmlFor="avatar-file"
              className={css.photoBtn}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                margin: 0,
              }}
            >
              Upload photo{" "}
              <Icon iconName="icon-cloud" className={css.cloudIcon} />
            </label>

            <input
              id="avatar-file"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
          </div>
          {errors.avatar && (
            <p id="avatar-error" role="alert" className={css.errorMessage}>
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
