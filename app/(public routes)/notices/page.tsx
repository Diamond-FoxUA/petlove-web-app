"use client";
import css from "./page.module.css";

import { useGetNoticesQuery } from "@/app/features/notices/model/noticesApi";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; // 1. Added router hooks
import useLoader from "@/app/shared/hooks/useLoader";
import Loader from "@/app/shared/components/Loader/Loader";

import Title from "@/app/shared/components/Title/Title";
import NoticesFilters from "@/app/features/notices/components/NoticesFilters/NoticesFIlters";
import NoticesList from "@/app/features/notices/components/NoticesList/NoticesList";
import Pagination from "@/app/shared/components/Pagination/Pagination";

export default function Notices() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const species = searchParams.get("species") || "";
  const sex = searchParams.get("sex") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error, isFetching } = useGetNoticesQuery({
    keyword,
    category,
    species,
    sex,
    page,
    limit: 6,
  });

  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const showLoader = useLoader(isLoading);
  if (showLoader) return <Loader />;

  if (!isFetching && error) {
    return (
      <p role="status" aria-live="polite" className={css.message}>
        Oops, <strong className={css.textError}>something went wrong.</strong>{" "}
        Try again later.
      </p>
    );
  }

  const hasNoResults =
    !isLoading &&
    !isFetching &&
    (!data || !data.results || data.results.length === 0);

  if (hasNoResults) {
    return (
      <p role="status" aria-live="polite" className={css.message}>
        Oops, <strong className={css.textAccent}>no notices found</strong>.
      </p>
    );
  }

  return (
    <div className={`container ${css.noticesContainer}`}>
      <Title text="Find your favorite pet" />

      <div className={css.NoticesFiltersContainer}>
        <NoticesFilters />
      </div>
      <div className={css.NoticesListContainer}>
        <NoticesList data={data?.results || []} />
      </div>
      <div className={css.paginationContainer}>
        <Pagination
          className={css.pagination}
          onPageChange={handlePageChange}
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
