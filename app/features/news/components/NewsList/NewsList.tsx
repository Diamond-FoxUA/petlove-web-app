import css from "./NewsList.module.css";
import NewsItem from "../NewsItem/NewsItem";

import type { NewsItem as NewsItemType } from "../../types/newsTypes";

type NewsListProps = {
  data: NewsItemType[];
};

export default function NewsList({ data }: NewsListProps) {
  return (
    <ul className={css.newsList}>
      {data?.map((item) => (
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
  );
}
