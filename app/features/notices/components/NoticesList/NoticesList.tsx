"use client";
import css from "./NoticesList.module.css";

import NoticesItem from "../NoticesItem/NoticesItem";
import { Notice } from "@/app/shared/types/noticesTypes";

type NoticesListProps = {
  data: Notice[];
};

export default function NoticesList({ data }: NoticesListProps) {
  return (
    <section className={css.noticesListContainer}>
      <ul className={css.noticesList}>
        {" "}
        {data?.map((n) => (
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
