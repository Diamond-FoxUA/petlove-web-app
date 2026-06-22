"use client";
import css from "./NoticesList.module.css";

import NoticesItem from "../NoticesItem/NoticesItem";
import { useGetNoticesQuery } from "../../model/noticesApi";
import { useSearchParams } from "next/navigation";

export default function NoticesList() {
  const searchParams = useSearchParams();

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

  if (!isFetching && error) {
    return (
      <p role="status" aria-live="polite" className={css.message}>
        Oops, <strong className={css.textAccent}>something went wrong.</strong>{" "}
        Try again later.
      </p>
    );
  }

  const hasNoResults =
    !isLoading && !isFetching && (!data || data.results.length === 0);

  if (hasNoResults) {
    return (
      <p role="status" aria-live="polite" className={css.message}>
        Oops, looks like there aren&apos;t any furries on our adorable page yet.
      </p>
    );
  }

  return (
    <section className={css.noticesListContainer}>
      <ul className={css.noticesList}>        {data?.results.map((n) => (
          <li key={n._id}>
            <NoticesItem
              name={n.name}
              title={n.title}
              birthday={n.birthday}
              imgURL={n.imgURL}
              species={n.species}
              sex={n.sex}
              price={n.price}
              category={n.category}
              comment={n.comment}
              location={n.location}
              popularity={n.popularity}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
