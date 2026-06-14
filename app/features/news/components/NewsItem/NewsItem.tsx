import css from "./NewsItem.module.css";

import Image from "next/image";
import Link from "next/link";

import type { NewsItem } from "../../types/newsTypes";

export default function NewsItem({
  title,
  text,
  date,
  url,
  imgUrl,
}: Omit<NewsItem, "_id" | "id">) {
  const formattedDate = new Date(date).toLocaleDateString("en-GB");

  return (
    <article className={css.article}>
      <Link href={url} target="_blank">
        <Image
          className={css.image}
          src={imgUrl}
          width={335}
          height={190}
          loading="lazy"
          alt={title}
        />
      </Link>

      <h2
        className={`${css.title} ${title.length <= 30 ? css.clampTitle : ""}`}
      >
        {title}
      </h2>
      <p className={css.paragraph}>{text}</p>

      <div className={css.articleFooter}>
        <span className={css.dateText}>{formattedDate}</span>
        <Link className={css.readMoreLink} href={url} target="_blank">
          Read more
        </Link>
      </div>
    </article>
  );
}
