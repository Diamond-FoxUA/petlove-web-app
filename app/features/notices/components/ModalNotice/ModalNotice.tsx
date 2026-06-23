import Icon from "@/app/shared/components/Icon/Icon";
import css from "./ModalNotice.module.css";

import Image from "next/image";
import Modal from "@/app/shared/components/Modal/Modal";
import ActionButton from "@/app/shared/components/ActionButton/ActionButton";

type ModalNoticeProps = {
  onClose: () => void;
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
};

export default function ModalNotice({
  onClose,
  title,
  popularity,
  name,
  birthday,
  sex,
  species,
  comment,
  price,
  _id,
  category,
  imgURL,
}: ModalNoticeProps) {
  return (
    <Modal onClose={onClose}>
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
          <dd>{new Date(birthday).toLocaleDateString().split("/").join(".")}</dd>
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

      <strong className={css.priceValue}>{`$${price}`}</strong>

      <div className={css.btnsContainer}>
        <ActionButton color="primary">
          Add to <Icon iconName="icon-heart" className={`${css.iconHeart} ${css.iconHeartAccent}`}/>
        </ActionButton>
        <ActionButton color="secondary">Contact</ActionButton>
      </div>
    </Modal>
  );
}
