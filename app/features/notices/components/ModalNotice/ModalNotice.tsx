import Icon from "@/app/shared/components/Icon/Icon";
import css from "./ModalNotice.module.css";

import Image from "next/image";
import Modal from "@/app/shared/components/Modal/Modal";
import ActionButton from "@/app/shared/components/ActionButton/ActionButton";

import { toast } from "sonner";

type ModalNoticeProps = {
  onClose: () => void;
  handleAddToFavClick: () => void;
  title: string;
  popularity: number;
  name: string;
  birthday: string;
  sex: string;
  species: string;
  comment: string;
  price: number;
  _id: string;
  imgURL: string;
  category: string;
  isFavourite: boolean | undefined;
  isLoading: boolean;
};

export default function ModalNotice({
  onClose,
  handleAddToFavClick,
  title,
  popularity,
  name,
  birthday,
  sex,
  species,
  comment,
  price,
  category,
  imgURL,
  isFavourite,
  isLoading,
}: ModalNoticeProps) {
  const handleContacting = () => {
    toast.success(
      "The pet owner will contact you upon reviewing your application.",
    );
    onClose();
  };

  return (
    <Modal onClose={onClose} className={css.modalNotice}>
      <div className={css.imageWrapper}>
        <span className={css.categoryTag}>{category}</span>
        <Image
          className={css.noticeImage}
          src={imgURL}
          width={120}
          height={120}
          alt="Notice profile picture"
        />
      </div>

      <h2 id="modal-headline" className={css.title}>
        {title}
      </h2>

      <div aria-label={`Popularity is ${popularity} stars`}>
        <div className={css.iconsContainer}>
          <Icon
            aria-label="hidden"
            iconName="icon-star"
            className={`${css.iconStar} ${popularity > 100 ? css.starAccent : ""}`}
          />
          <Icon
            aria-label="hidden"
            iconName="icon-star"
            className={`${css.iconStar} ${popularity > 200 ? css.starAccent : ""}`}
          />
          <Icon
            aria-label="hidden"
            iconName="icon-star"
            className={`${css.iconStar} ${popularity > 500 ? css.starAccent : ""}`}
          />
          <Icon
            aria-label="hidden"
            iconName="icon-star"
            className={`${css.iconStar} ${popularity > 1000 ? css.starAccent : ""}`}
          />
          <Icon
            aria-label="hidden"
            iconName="icon-star"
            className={`${css.iconStar} ${popularity >= 5000 ? css.starAccent : ""}`}
          />
          <span
            aria-label={`Notices rating is: ${popularity}`}
            className={css.ratingNumber}
          >
            {popularity}
          </span>
        </div>
      </div>

      <dl className={css.infoTagList}>
        <div className={css.infoTagItem}>
          <dt>Name</dt>
          <dd>{name}</dd>
        </div>
        <div className={css.infoTagItem}>
          <dt>Birthday</dt>
          <dd>
            {birthday
              ? new Date(birthday).toLocaleDateString().split("/").join(".")
              : "Unknown"}
          </dd>
        </div>
        <div className={css.infoTagItem}>
          <dt>Sex</dt>
          <dd>{sex}</dd>
        </div>
        <div className={css.infoTagItem}>
          <dt>Species</dt>
          <dd>{species}</dd>
        </div>
      </dl>

      <p className={css.paragraph}>{comment}</p>

      <strong className={css.priceValue}>{price ? `$${price}` : "Free"}</strong>

      <div className={css.btnsContainer}>
        <ActionButton
          color="primary"
          disabled={isLoading}
          onClick={handleAddToFavClick}
        >
          {!isFavourite ? "Add to" : "Remove from"}{" "}
          <Icon
            iconName="icon-heart"
            className={`${css.iconHeart} ${isFavourite ? css.iconHeartAccent : ""}`}
          />
        </ActionButton>
        <ActionButton color="secondary" onClick={handleContacting}>
          Contact
        </ActionButton>
      </div>
    </Modal>
  );
}
