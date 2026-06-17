"use client";
import "react-datepicker/dist/react-datepicker.css";
import css from "./AddPetForm.module.css";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import { useRouter } from "next/navigation";
import Image from "next/image";


import { addPetSchema } from "../../schemas/addPetSchema";
import Icon from "@/app/shared/components/Icon/Icon";
import ActionButton from "@/app/shared/components/ActionButton/ActionButton";
import LinkButton from "@/app/shared/components/LinkButton/LinkButton";

import type { AddPetFormData } from "../../schemas/addPetSchema";

type AddPetFormProps = {
  species: string[];
};

export default function AddPetForm({ species }: AddPetFormProps) {
  const router = useRouter();
  if (species.length === 0) router.refresh();

  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    getValues,
    setValue,
    trigger,
    reset,
  } = useForm<AddPetFormData>({
    resolver: yupResolver(addPetSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      name: "",
      imgUrl: "",
      species: "",
      birthday: "",
      sex: "",
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);

          const currentValue = getValues("species");
          if (!currentValue) {
            trigger("species");
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, getValues, trigger]);

  const handleApplyPhoto = async () => {
    const isUrlValid = await trigger("imgUrl");

    if (isUrlValid) {
      const currentUrl = getValues("imgUrl");
      setPreviewUrl(currentUrl);
    }
  };

  const onSubmit = (data: AddPetFormData) => {
    console.log(data);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset
        className={css.fieldset}
        aria-invalid={errors.sex ? "true" : "false"}
        aria-describedby="pet-gender-error"
      >
        <legend className="sr-only">Choose your pet&apos;s sex</legend>

        <label className={`${css.genderWrapper} ${css.femaleInput}`}>
          <input
            type="radio"
            value="female"
            className={css.radioInput}
            {...register("sex")}
          />

          <span className="sr-only">Female</span>
          <Icon
            iconName="icon-female"
            aria-hidden="true"
            className={`${css.genderIcon} ${css.femaleIcon}`}
          />
        </label>

        <label className={`${css.genderWrapper} ${css.maleInput}`}>
          <input
            type="radio"
            value="male"
            className={css.radioInput}
            {...register("sex")}
          />

          <span className="sr-only">Male</span>
          <Icon
            iconName="icon-male"
            aria-hidden="true"
            className={`${css.genderIcon} ${css.maleIcon}`}
          />
        </label>

        <label className={`${css.genderWrapper} ${css.multipleInput}`}>
          <input
            type="radio"
            value="multiple"
            className={css.radioInput}
            {...register("sex")}
          />

          <span className="sr-only">Multiple</span>
          <Icon
            iconName="icon-reproductive"
            aria-hidden="true"
            className={`${css.genderIcon} ${css.multipleIcon}`}
          />
        </label>
      </fieldset>
      {errors.sex && (
        <p id="pet-gender-error" role="alert" className={css.errorMessage}>
          {errors.sex.message}
        </p>
      )}

      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="Your pet's profile picture preview"
          width={68}
          height={68}
          className={css.petAvatar}
        />
      ) : (
        <div className={css.petAvatarPlaceholder} aria-hidden="true">
          <Icon iconName="icon-paw" className={css.pawIcon} />
        </div>
      )}

      <div className={css.inputContainer}>
        <div className={css.inputGroup}>
          <div className={css.fieldWrapper}>
            <label htmlFor="pet-img-url" className="sr-only">
              Pet image URL
            </label>
            <input
              className={`${css.input} ${css.urlInput}`}
              id="pet-img-url"
              type="url"
              placeholder="Enter URL"
              {...register("imgUrl")}
              aria-invalid={errors.imgUrl ? "true" : "false"}
              aria-describedby={errors.imgUrl ? "pet-imgUrl-error" : undefined}
            />
            {errors.imgUrl && (
              <p
                className={css.errorMessage}
                id="pet-imgUrl-error"
                role="alert"
              >
                {errors.imgUrl.message}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleApplyPhoto}
            className={css.applyPhotoBtn}
          >
            Upload photo{" "}
            <Icon iconName="icon-cloud" className={css.cloudIcon} />
          </button>
        </div>

        <div>
          <label htmlFor="pet-title" className="sr-only">
            Pet profile title
          </label>
          <input
            id="pet-title"
            className={css.input}
            type="text"
            placeholder="Title"
            {...register("title")}
            aria-invalid={errors.title ? "true" : "false"}
            aria-describedby="pet-title-error"
          />

          {errors.title && (
            <p id="pet-title-error" role="alert" className={css.errorMessage}>
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="pet-name" className="sr-only">
            Pet&apos;s name
          </label>
          <input
            id="pet-name"
            className={css.input}
            type="text"
            placeholder="Pet's name"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby="pet-name-error"
          />
          {errors.name && (
            <p id="pet-name-error" role="alert" className={css.errorMessage}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div className={css.inputGroup}>
          <div className={css.inputContainer}>
            <div className={css.dateInputWrapper}>
              <label htmlFor="pet-birthday" className="sr-only">
                Pet&apos;s birthday
              </label>
              <Controller
                control={control}
                name="birthday"
                render={({ field }) => (
                  <DatePicker
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    disabledKeyboardNavigation
                    id="pet-birthday"
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date: Date | null) => {
                      if (date) {
                        const yyyy = date.getFullYear();
                        const mm = String(date.getMonth() + 1).padStart(2, "0");
                        const dd = String(date.getDate()).padStart(2, "0");
                        field.onChange(`${yyyy}-${mm}-${dd}`);
                      } else {
                        field.onChange("");
                      }
                    }}
                    onBlur={field.onBlur}
                    placeholderText="00.00.0000"
                    dateFormat={"dd.MM.yyyy"}
                    maxDate={new Date()}
                    className={`${css.input} ${css.dateInput}`}
                    aria-invalid={errors.birthday ? "true" : "false"}
                    aria-describedby={
                      errors.birthday ? "pet-birthday-error" : undefined
                    }
                  ></DatePicker>
                )}
              ></Controller>
              <Icon iconName="icon-calendar" className={css.calendarIcon} />
            </div>
            {errors.birthday && (
              <p
                id="pet-birthday-error"
                role="alert"
                className={css.errorMessage}
              >
                {errors.birthday.message}
              </p>
            )}
          </div>

          <div className={css.inputContainer}>
            <div ref={dropdownRef} className={css.customDropdownWrapper}>
              <label htmlFor="pet-species-trigger" className="sr-only">
                Type of pet
              </label>
              <button
                id="pet-species-trigger"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => {
                  if (isOpen) {
                    const currentValue = getValues("species");
                    if (!currentValue) {
                      trigger("species");
                    }
                  }

                  setIsOpen((prev) => !prev);
                }}
                className={`${css.visualCapsule} ${isOpen ? css.visualOpen : ""} ${selectedSpecies ? css.borderAccent : ""}`}
              >
                <span
                  className={
                    selectedSpecies ? css.valueText : css.placeholderText
                  }
                >
                  {selectedSpecies || "Type of pet"}
                </span>
                <Icon
                  iconName="icon-chevron-down"
                  className={`${css.chevronIcon} ${isOpen ? css.chevronOpen : ""} `}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <ul
                  className={css.dropdownMenu}
                  role="listbox"
                  aria-labelledby="pet-species-trigger"
                >
                  {species.map((type) => (
                    <li key={type}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={selectedSpecies === type}
                        onClick={() => {
                          setSelectedSpecies(type);
                          setValue("species", type, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                          setIsOpen(false);
                        }}
                        className={css.dropdownItem}
                      >
                        {type}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <input
                type="hidden"
                {...register("species")}
                aria-invalid={errors.species ? "true" : "false"}
                aria-describedby={
                  errors.species ? "pet-species-error" : undefined
                }
              />
            </div>
            {errors.species && (
              <p
                id="pet-species-error"
                role="alert"
                className={css.errorMessage}
              >
                {errors.species.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={css.actionBtnsContainer}>
        <LinkButton color="gray" href="/profile">Back</LinkButton>
        <ActionButton type="submit">Submit</ActionButton>
      </div>
    </form>
  );
}
