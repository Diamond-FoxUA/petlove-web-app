import css from "./NoticesItem.module.css";
import { useState } from "react";

import Icon from "@/app/shared/components/Icon/Icon";
import Image from "next/image";
import ActionButton from "@/app/shared/components/ActionButton/ActionButton";
import ModalAttention from "@/app/features/auth/components/ModalAttention/ModalAttention";

import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from "../../model/noticesApi";
import { setCredentials } from "@/app/features/auth/model/authSlice";

import type { Notice } from "@/app/shared/types/noticesTypes";

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
  location,
  _id: id,
}: Omit<Notice, "createdAt" | "updatedAt" | "user">) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [addFavourite, { isLoading: isAdding }] = useAddFavouriteMutation();
  const [removeFavourite, { isLoading: isRemoving }] = useRemoveFavouriteMutation();

  const isFavourite = user?.noticesFavorites?.some((fav) => fav._id === id);
  const isUpdating = isAdding || isRemoving;

  const [isModalAttentionOpen, setIsModalAttentionOpen] = useState(false);
  const [isModalNoticeOpen, setIsModalNoticeOpen] = useState<null | string>(
    null,
  );

  const handleLearnMoreClick = () => {
    if (!user) {
      setIsModalAttentionOpen(true);
      return;
    }
    setIsModalNoticeOpen(id);
  };

  const handleAddToFavClick = async () => {
    if (!user) {
      setIsModalAttentionOpen(true);
      return;
    }

    try {
      if (isFavourite) {
        await removeFavourite(id).unwrap();
      } else {
        await addFavourite(id).unwrap();
      }

      const currentNotice: Notice = {
        _id: id,
        name,
        title,
        imgURL,
        birthday,
        species,
        sex,
        price,
        location,
        popularity,
        comment,
        category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: user._id,
      };

      const currentFavorites = user.noticesFavorites ? [...user.noticesFavorites] : [];

      const newFavoritesList = isFavourite
        ? currentFavorites.filter((fav) => fav._id !== id)
        : [...currentFavorites, currentNotice];

      dispatch(
        setCredentials({
          ...user,
          noticesFavorites: newFavoritesList,
        }),
      );
    } catch (error) {
      console.error("Error with changing notice's favourite status:", error);
    }
  };

  return (
    <>
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
            <dd>
              {birthday ? birthday.split("-").reverse().join(".") : "Unknown"}
            </dd>
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
          <ActionButton
            type="button"
            className={css.learnMoreBtn}
            onClick={handleLearnMoreClick}
          >
            Learn more
          </ActionButton>
          <button
            disabled={isUpdating}
            type="button"
            className={css.favouriteBtn}
            onClick={handleAddToFavClick}
          >
            <Icon
              iconName="icon-heart"
              className={`${css.iconHeart} ${isFavourite ? css.isFavourite : ""}`}
            />
          </button>
        </div>
      </article>

      {isModalAttentionOpen && (
        <ModalAttention onClose={() => setIsModalAttentionOpen(false)} />
      )}

      {isModalNoticeOpen && (
        <ModalAttention onClose={() => setIsModalNoticeOpen(null)} />
      )}
    </>
  );
}
