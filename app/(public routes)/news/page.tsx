"use client";

import css from "./page.module.css";
import { ChangeEvent, useState } from "react";

import Title from "@/app/shared/components/Title/Title";
import SearchField from "@/app/shared/components/SearchField/SearchField";
import NewsList from "@/app/features/news/components/NewsList/NewsList";
import Pagination from "@/app/shared/components/Pagination/Pagination";
import Loader from "@/app/shared/components/Loader/Loader";

import { useGetNewsQuery } from "@/app/features/news/api/newsApi";
import useLoader from "@/app/shared/hooks/useLoader";

export default function News() {
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isFetching, error } = useGetNewsQuery({
    keyword: searchQuery,
    page,
    limit,
  });

  const totalPages = data?.totalPages || 1;

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

  const showLoader = useLoader(isFetching);

  return (
    <section
      className={`container ${css.sectionContainer}`}
      aria-labelledby="news-page-title"
    >
      {showLoader && <Loader />}

      <header className={css.newsHeader}>
        <Title text="News" id="news-page-title" />
        <SearchField
          onSubmit={handleSubmit}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          reset={handleReset}
        />
      </header>

      {!isFetching && error && (
        <p role="status" aria-live="polite" className={css.message}>
          Oops, something went wrong.. Try again later.
        </p>
      )}

      {!isFetching && data?.results.length === 0 && (
        <p role="status" aria-live="polite" className={css.message}>
          No news found.
        </p>
      )}

      {!isFetching && data && <NewsList data={data?.results} />}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
}
