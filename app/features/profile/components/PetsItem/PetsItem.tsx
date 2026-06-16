import css from "./PetsItem.module.css";
import Image from "next/image";

import Icon from "@/app/shared/components/Icon/Icon";

import type { Pet } from "@/app/shared/types/noticesTypes";
type PetsItemProps = {
  pet: Pet;
  deleteUserPet: () => void;
};

export default function PetsItem({ pet, deleteUserPet }: PetsItemProps) {
  return (
    <article className={css.petsItem}>
      <button
        type="button"
        className={css.deleteBtn}
        aria-label="Delete your pet profile"
        onClick={deleteUserPet}
      >
        <Icon
          iconName="icon-trash"
          className={css.trashIcon}
          aria-hidden="true"
        />
      </button>

      <Image
        src={pet.imgURL}
        alt=""
        className={css.petImage}
        loading="eager"
        width={66}
        height={66}
      />

      <div className={css.petInfoContainer}>
        <h3 className={css.petTitle}>{pet.title}</h3>

        <dl className={css.petDescriptionList}>
          <div className={css.petDescriptionItem}>
            <dt className={css.descKey}>Name</dt>
            <dd className={css.descData}>{pet.name}</dd>
          </div>
          <div className={css.petDescriptionItem}>
            <dt className={css.descKey}>Birthday</dt>
            <dd className={css.descData}>{pet.birthday}</dd>
          </div>
          <div className={css.petDescriptionItem}>
            <dt className={css.descKey}>Sex</dt>
            <dd className={css.descData}>{pet.sex}</dd>
          </div>
          <div className={css.petDescriptionItem}>
            <dt className={css.descKey}>Species</dt>
            <dd className={css.descData}>{pet.species}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
