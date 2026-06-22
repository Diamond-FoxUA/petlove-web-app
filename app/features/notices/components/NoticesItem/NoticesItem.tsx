import Icon from "@/app/shared/components/Icon/Icon";
import css from "./NoticesItem.module.css";
import type { Notice } from "@/app/shared/types/noticesTypes";

import Image from "next/image";
import ActionButton from "@/app/shared/components/ActionButton/ActionButton";

export default function NoticesItem({
  name,
  title,
  imgURL,
  birthday,
  species,
  sex,
  price,
  popularity,
  comment,
  category,
}: Omit<Notice, "_id" | "createdAt" | "updatedAt" | "user">) {
  return (
    <article className={css.articleContainer}>
      <Image
        className={css.image}
        src={imgURL}
        alt={`${species} named ${name}`}
        width={287}
        height={178}
        loading="eager"
      />

      <header className={css.articleHeader}>
        <h2 className={css.title}>{title}</h2>
        <div
          className={css.ratingContainer}
          aria-label={`Popularity rating: ${popularity} stars`}
        >
          <Icon
            iconName="icon-star"
            aria-hidden="true"
            className={css.starIcon}
          />
          <span aria-hidden="true">{popularity}</span>
        </div>
      </header>
      <dl className={css.tagContainer}>
        <div className={css.tagItem}>
          <dt>Name</dt>
          <dd>{name}</dd>
        </div>
        <div className={css.tagItem}>
          <dt>Birthday</dt>
          <dd>{birthday.split("-").reverse().join(".")}</dd>
        </div>
        <div className={css.tagItem}>
          <dt>Sex</dt>
          <dd>{sex}</dd>
        </div>
        <div className={css.tagItem}>
          <dt>Species</dt>
          <dd>{species}</dd>
        </div>
        <div className={css.tagItem}>
          <dt>Category</dt>
          <dd>{category}</dd>
        </div>
      </dl>
      <p className={css.paragraph}>{comment}</p>

      <div className={css.priceContainer}>
        <strong
          className={css.priceValue}
          aria-label={price ? `Price: ${price}` : "Free"}
        >
          {price ? `$${price}` : "Free"}
        </strong>
      </div>

      <div className={css.btnsContainer}>
        <ActionButton type="button" className={css.learnMoreBtn}>
          Learn more
        </ActionButton>
        <button type="button" className={css.favouriteBtn}>
          <Icon iconName="icon-heart" className={css.iconHeart} />
        </button>
      </div>
    </article>
  );
}
