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
  const machineDate = new Date(date).toISOString().split("T")[0];

  return (
    <article className={css.article}>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden
      >
        <Image
          className={css.image}
          src={imgUrl}
          width={335}
          height={190}
          loading="lazy"
          alt=""
        />
      </Link>

      <h2
        className={`${css.title} ${title.length <= 30 ? css.clampTitle : ""}`}
      >
        {title}
      </h2>
      <p className={css.paragraph}>{text}</p>

      <div className={css.articleFooter}>
        <time dateTime={machineDate} className={css.dateText}>
          {formattedDate}
        </time>
        <Link
          className={css.readMoreLink}
          href={url}
          rel="noopener noreferrer"
          aria-label={`Read more about: ${title}`}
          target="_blank"
        >
          Read more
        </Link>
        <span className="sr-only"> (opens in a new tab)</span>
      </div>
    </article>
  );
}
