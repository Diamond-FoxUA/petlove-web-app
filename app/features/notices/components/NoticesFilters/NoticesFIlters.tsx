"use client";
import css from "./NoticesFilters.module.css";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import AsyncSelect from "react-select/async";

import {
  useGetSpeciesQuery,
  useGetCategoriesQuery,
  useGetSexQuery,
  useLazyGetCitiesQuery,
} from "../../model/noticesApi";

import Icon from "@/app/shared/components/Icon/Icon";
import SearchField from "@/app/shared/components/SearchField/SearchField";
import type { CityResponse } from "../../types/notices";

type FormValues = {
  search: string;
  category: string;
  gender: string;
  type: string;
  sortTag: string;
  locationId: string;
};

export default function NoticesFilters() {
  const [selectedCityOption, setSelectedCityOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getInitialSortTag = () => {
    if (searchParams.get("byPrice") === "true") return "cheap";
    if (searchParams.get("byPrice") === "false") return "expensive";
    if (searchParams.get("byPopularity") === "false") return "popular";
    if (searchParams.get("byPopularity") === "true") return "unpopular";
    return "";
  };

  const defaultValues: FormValues = {
    search: searchParams.get("keyword") || "",
    category: searchParams.get("category") || "",
    gender: searchParams.get("sex") || "",
    type: searchParams.get("species") || "",
    sortTag: getInitialSortTag(),
    locationId: searchParams.get("locationId") || "",
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

  const updateURLParams = (updatedFields: Partial<FormValues>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (updatedFields.search !== undefined) {
      if (updatedFields.search) params.set("keyword", updatedFields.search);
      else params.delete("keyword");
    }
    if (updatedFields.category !== undefined) {
      if (updatedFields.category)
        params.set("category", updatedFields.category);
      else params.delete("category");
    }
    if (updatedFields.gender !== undefined) {
      if (updatedFields.gender) params.set("sex", updatedFields.gender);
      else params.delete("sex");
    }
    if (updatedFields.type !== undefined) {
      if (updatedFields.type) params.set("species", updatedFields.type);
      else params.delete("species");
    }
    if (updatedFields.locationId !== undefined) {
      if (updatedFields.locationId)
        params.set("locationId", updatedFields.locationId);
      else params.delete("locationId");
    }
    if (updatedFields.sortTag !== undefined) {
      params.delete("byDate");
      params.delete("byPrice");
      params.delete("byPopularity");

      const tag = updatedFields.sortTag;
      if (tag === "cheap") params.set("byPrice", "true");
      else if (tag === "expensive") params.set("byPrice", "false");
      else if (tag === "popular") params.set("byPopularity", "false");
      else if (tag === "unpopular") params.set("byPopularity", "true");
      else params.set("byDate", "true");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelect = (field: keyof FormValues, value: string) => {
    setValue(field, value);
    setOpenDropdown(null);
    updateURLParams({ [field]: value });
  };

  const handleReset = () => {
    resetField("search");
    setValue("category", "");
    setValue("gender", "");
    setValue("type", "");
    setValue("sortTag", "");
    setValue("locationId", "");

    setSelectedCityOption(null);

    const params = new URLSearchParams();
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const categories = useGetCategoriesQuery();
  const genders = useGetSexQuery();
  const types = useGetSpeciesQuery();
  const tags = ["popular", "unpopular", "cheap", "expensive"];

  const [triggerGetCities] = useLazyGetCitiesQuery();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const loadLocationOptions = async (inputValue: string) => {
    try {
      const result = (await triggerGetCities().unwrap()) as CityResponse[];
      if (!inputValue.trim()) {
        return result.map((city) => ({
          value: city._id,
          label: `${city.cityEn}, ${city.stateEn}`,
        }));
      }
      return result
        .filter((city) =>
          city.cityEn.toLowerCase().includes(inputValue.toLowerCase()),
        )
        .slice(0, 3)
        .map((city) => ({
          value: city._id,
          label: `${city.cityEn}, ${city.stateEn}`,
        }));
    } catch (error) {
      console.error("Error fetching locations:", error);
      return [];
    }
  };

  const hasActiveFilters = Boolean(
    selectedCategory ||
    selectedGender ||
    selectedType ||
    selectedSortTag ||
    selectedCityOption,
  );

  const formatOptionLabel = (
    { label }: { label: string },
    { inputValue }: { inputValue: string },
  ) => {
    if (!inputValue.trim()) return <span>{label}</span>;
    const regex = new RegExp(`(${inputValue})`, "gi");
    const parts = label.split(regex);
    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <strong key={index} className={css.highlightedText}>
              {part}
            </strong>
          ) : (
            <span key={index} className={css.normalText}>
              {part}
            </span>
          ),
        )}
      </span>
    );
  };

  const onSubmit = (formData: FormValues) => {
    updateURLParams({ search: formData.search });
  };

  return (
    <section
      className={css.noticesFilterContainer}
      aria-label="Notices filters"
    >
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.topFiltersWrapper}>
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <SearchField
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                reset={() => {
                  resetField("search");
                  updateURLParams({ search: "" });
                }}
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

          <div className={css.locationSelectWrapper}>
            <Controller
              name="locationId"
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  unstyled
                  classNamePrefix="location-select"
                  {...field}
                  loadOptions={loadLocationOptions}
                  formatOptionLabel={formatOptionLabel}
                  cacheOptions
                  isClearable
                  placeholder="Location"
                  value={selectedCityOption}
                  components={{
                    DropdownIndicator: () => (
                      <div className={css.locationSearchIndicator}>
                        <Icon
                          iconName="icon-search"
                          className={css.locationSearchIcon}
                        />
                      </div>
                    ),
                    ClearIndicator: (props) => (
                      <div
                        {...props.innerProps}
                        className={css.locationClearIndicator}
                      >
                        <Icon
                          iconName="icon-cross-small"
                          className={css.locationClearIcon}
                        />
                      </div>
                    ),
                  }}
                  onChange={(
                    option: { value: string; label: string } | null,
                  ) => {
                    const idValue = option ? option.value : "";

                    setSelectedCityOption(option);
                    field.onChange(idValue);
                    updateURLParams({ locationId: idValue });
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className={css.hr} />

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
                  onChange={() => {
                    setValue("sortTag", t);
                    updateURLParams({ sortTag: t });
                  }}
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
                        updateURLParams({ sortTag: "" });
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

        {hasActiveFilters && (
          <button type="button" className={css.resetBtn} onClick={handleReset}>
            Reset filters
          </button>
        )}
      </form>
    </section>
  );
}
