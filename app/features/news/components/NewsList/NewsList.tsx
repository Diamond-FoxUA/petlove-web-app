"use client";

import css from "./NewsList.module.css";
import { useState, useEffect } from "react";
import { useGetNewsQuery } from "../../api/newsApi";

import useLoader from "@/app/shared/hooks/useLoader";
import Loader from "@/app/shared/components/Loader/Loader";
import NewsItem from "../NewsItem/NewsItem";

type NewsListProps = {
  searchValue: string;
};

export default function NewsList({ searchValue }: NewsListProps) {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
      setPage(1);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchValue]);

  const { data, isFetching, error } = useGetNewsQuery({
    keyword: debouncedSearch,
    page,
  });

  const showLoader = useLoader(isFetching);

  if (!isFetching && error) return <h2 className={css.message}>Oops, something went wrong.. Try again later.</h2>;

  if (!isFetching && data?.results.length === 0) {
    return <h2 className={css.message}>No news found.</h2>;
  }

  return (
    <>
      {showLoader && <Loader />}
  
      <ul className={css.newsList}>
        {data?.results.map((item) => (
          <li key={item._id} className={css.newsItem}>
            <NewsItem
              title={item.title}
              text={item.text}
              date={item.date}
              url={item.url}
              imgUrl={item.imgUrl}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
