"use client";
import css from "./NoticesPage.module.css";

import { useGetNoticesQuery } from "@/app/features/notices/model/noticesApi";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import Loader from "@/app/shared/components/Loader/Loader";
import Title from "@/app/shared/components/Title/Title";
import NoticesFilters from "@/app/features/notices/components/NoticesFilters/NoticesFIlters";
import NoticesList from "@/app/features/notices/components/NoticesList/NoticesList";
import Pagination from "@/app/shared/components/Pagination/Pagination";

export default function NoticesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const species = searchParams.get("species") || "";
  const sex = searchParams.get("sex") || "";
  const locationId = searchParams.get("locationId") || "";
  const page = Number(searchParams.get("page")) || 1;

  const byDate = searchParams.get("byDate") === "false" ? false : true;
  const byPrice =
    searchParams.get("byPrice") === "true"
      ? true
      : searchParams.get("byPrice") === "false"
        ? false
        : undefined;
  const byPopularity =
    searchParams.get("byPopularity") === "true"
      ? true
      : searchParams.get("byPopularity") === "false"
        ? false
        : undefined;

  const { data, isLoading, error, isFetching } = useGetNoticesQuery({
    keyword,
    category,
    species,
    sex,
    locationId,
    page,
    limit: 6,
    byDate,
    byPrice,
    byPopularity,
  });

  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) return <Loader />;

  return (
    <div className={`container ${css.noticesContainer}`}>
      <Title text="Find your favorite pet" />

      <div className={css.NoticesFiltersContainer}>
        <NoticesFilters />
      </div>

      {!isFetching && error && (
        <p role="status" aria-live="polite" className={css.message}>
          Oops, <strong className={css.textError}>something went wrong.</strong>{" "}
          Try again later.
        </p>
      )}

      {!error &&
        !isLoading &&
        (!data || !data.results || data.results.length === 0) && (
          <p role="status" aria-live="polite" className={css.message}>
            Oops, <strong className={css.textAccent}>no notices found</strong>.
          </p>
        )}

      {data && data.results && data.results.length > 0 && (
        <>
          <div className={css.NoticesListContainer}>
            <NoticesList data={data.results} />
          </div>
          <div className={css.paginationContainer}>
            <Pagination
              className={css.pagination}
              onPageChange={handlePageChange}
              currentPage={page}
              totalPages={totalPages}
            />
          </div>
        </>
      )}
    </div>
  );
}
