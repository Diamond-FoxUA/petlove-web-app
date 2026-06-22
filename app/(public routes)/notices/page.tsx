"use client";
import css from "./page.module.css";

import Title from "@/app/shared/components/Title/Title";
import NoticesFilters from "@/app/features/notices/components/NoticesFilters/NoticesFIlters";
import NoticesList from "@/app/features/notices/components/NoticesList/NoticesList";
import Pagination from "@/app/shared/components/Pagination/Pagination";

export default function Notices() {
  const handlePageChange = () => {
    console.log("null");
  };
  return (
    <div className={`container ${css.noticesContainer}`}>
      <Title text="Find your favorite pet" />

      <div className={css.NoticesFiltersContainer}>
        <NoticesFilters />
      </div>
      <div className={css.NoticesListContainer}>
        <NoticesList />
      </div>
      <div className={css.paginationContainer}>
        <Pagination
          className={css.pagination}
          onPageChange={handlePageChange}
          currentPage={1}
          totalPages={5}
        />
      </div>
    </div>
  );
}
