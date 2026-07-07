"use client";
import css from "./NoticesFilters.module.css";

import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";

import {
  useGetSpeciesQuery,
  useGetCategoriesQuery,
  useGetSexQuery,
} from "../../model/noticesApi";

import Icon from "@/app/shared/components/Icon/Icon";
import SearchField from "@/app/shared/components/SearchField/SearchField";

type FormValues = {
  search: string;
  category: string;
  gender: string;
  type: string;
  sortTag: string;
};

export default function NoticesFilters() {
  const defaultValues: FormValues = {
    search: "",
    category: "",
    gender: "",
    type: "",
    sortTag: "",
  };

  const { handleSubmit, setValue, resetField, control, register } =
    useForm<FormValues>({
      defaultValues,
    });

  const selectedCategory = useWatch({ control, name: "category" });
  const selectedGender = useWatch({ control, name: "gender" });
  const selectedType = useWatch({ control, name: "type" });
  const selectedSortTag = useWatch({ control, name: "sortTag" });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelect = (field: keyof FormValues, value: string) => {
    setValue(field, value);
    setOpenDropdown(null);
  };

  const categories = useGetCategoriesQuery();
  const genders = useGetSexQuery();
  const types = useGetSpeciesQuery();
  const tags = ["popular", "unpopular", "cheap", "expensive"];

  const onSubmit = (data: FormValues) => {
    console.log("Submit filter data:", data);
  };

  return (
    <section
      className={css.noticesFilterContainer}
      aria-label="Notices filters"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.topFiltersWrapper}>
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <SearchField
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                reset={() => resetField("search")}
              />
            )}
          />

          <div className={css.inputGroup}>
            <div className={css.dropdown}>
              <button
                type="button"
                className={css.btnInput}
                onClick={() => toggleDropdown("category")}
              >
                {selectedCategory
                  ? selectedCategory
                      .split("")
                      .map((l, i) => (i === 0 ? l.toUpperCase() : l))
                      .join("")
                  : "Category"}
              </button>
              <Icon
                iconName="icon-chevron-down"
                className={`${css.inputIcon} ${openDropdown === "category" ? css.activeInputIcon : ""}`}
              />
              {openDropdown === "category" && (
                <ul className={css.dropdownList}>
                  <li
                    className={`${css.dropdownItem} ${!selectedCategory ? css.dropdownItemActive : ""}`}
                    onClick={() => handleSelect("category", "")}
                  >
                    Show all
                  </li>
                  {categories.data?.map((c) => (
                    <li
                      key={c}
                      className={`${css.dropdownItem} ${selectedCategory === c ? css.dropdownItemActive : ""}`}
                      onClick={() => handleSelect("category", c)}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={css.dropdown}>
              <button
                type="button"
                className={css.btnInput}
                onClick={() => toggleDropdown("gender")}
              >
                {selectedGender
                  ? selectedGender
                      .split("")
                      .map((l, i) => (i === 0 ? l.toUpperCase() : l))
                      .join("")
                  : "By gender"}
              </button>
              <Icon
                iconName="icon-chevron-down"
                className={`${css.inputIcon} ${openDropdown === "gender" ? css.activeInputIcon : ""}`}
              />
              {openDropdown === "gender" && (
                <ul className={css.dropdownList}>
                  <li
                    className={`${css.dropdownItem} ${!selectedGender ? css.dropdownItemActive : ""}`}
                    onClick={() => handleSelect("gender", "")}
                  >
                    Show all
                  </li>
                  {genders.data?.map((g) => (
                    <li
                      key={g}
                      className={`${css.dropdownItem} ${selectedGender === g ? css.dropdownItemActive : ""}`}
                      onClick={() => handleSelect("gender", g)}
                    >
                      {g}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={css.dropdown}>
            <button
              type="button"
              className={css.btnInput}
              onClick={() => toggleDropdown("type")}
            >
              {selectedType
                ? selectedType
                    .split("")
                    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
                    .join("")
                : "By type"}
            </button>
            <Icon
              iconName="icon-chevron-down"
              className={`${css.inputIcon} ${openDropdown === "type" ? css.activeInputIcon : ""}`}
            />
            {openDropdown === "type" && (
              <ul className={css.dropdownList}>
                <li
                  className={`${css.dropdownItem} ${!selectedType ? css.dropdownItemActive : ""}`}
                  onClick={() => handleSelect("type", "")}
                >
                  Show all
                </li>
                {types.data?.map((t) => (
                  <li
                    key={t}
                    className={`${css.dropdownItem} ${selectedType === t ? css.dropdownItemActive : ""}`}
                    onClick={() => handleSelect("type", t)}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <hr className={css.hr} />

        <div
          className={css.bottomFiltersWrapper}
          role="radiogroup"
          aria-label="Sort options"
        >
          {tags.map((t) => {
            const isActive = selectedSortTag === t;

            return (
              <label key={t} htmlFor={t} className={css.labelTag}>
                <input
                  className={css.hiddenRadio}
                  id={t}
                  type="radio"
                  value={t}
                  {...register("sortTag")}
                  checked={isActive}
                  onChange={() => setValue("sortTag", t)}
                />
                <span
                  className={`${css.tagText} ${isActive ? css.activeTagText : ""}`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                  {isActive && (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setValue("sortTag", "");
                      }}
                    >
                      <Icon iconName="icon-cross" className={css.tagIcon} />
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </form>
    </section>
  );
}
