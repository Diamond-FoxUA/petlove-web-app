"use client";

import css from "./page.module.css";
import { ChangeEvent, useState } from "react";

import Title from "@/app/shared/components/Title/Title";
import SearchField from "@/app/shared/components/SearchField/SearchField";
import NewsList from "@/app/features/news/components/NewsList/NewsList";

export default function News() {
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setSearchQuery(value);
  };

  const handleReset = () => {
    setValue("");
  };

  return (
    <section className={`container ${css.sectionContainer}`}>
      <header className={css.newsHeader}>
        <Title text="News" />
        <SearchField
          onSubmit={handleSubmit}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          reset={handleReset}
        />
      </header>

      <NewsList searchValue={searchQuery} />

      {/* Pagination */}
    </section>
  );
}
