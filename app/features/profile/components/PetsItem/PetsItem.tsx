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

      <div className={css.imageWrapper}>
        <Image
          src={pet.imgURL}
          alt=""
          className={css.petImage}
          loading="eager"
          fill
          sizes="66px"
        />
      </div>

      <div className={css.petInfoContainer}>
        <h3
          className={css.petTitle}
        >{`${pet.title.split("")[0].toUpperCase()}${pet.title.slice(1)}`}</h3>

        <dl className={css.petDescriptionList}>
          <div className={css.petDescriptionItem}>
            <dt className={css.descKey}>Name</dt>
            <dd
              className={css.descData}
            >{`${pet.name.split("")[0].toUpperCase()}${pet.name.slice(1)}`}</dd>
          </div>
          <div className={css.petDescriptionItem}>
            <dt className={css.descKey}>Birthday</dt>
            <dd className={css.descData}>
              {new Date(pet.birthday).toLocaleDateString().split("/").join(".")}
            </dd>
          </div>
          <div className={css.petDescriptionItem}>
            <dt className={css.descKey}>Sex</dt>
            <dd
              className={css.descData}
            >{`${pet.sex.split("")[0].toUpperCase()}${pet.sex.slice(1)}`}</dd>
          </div>
          <div className={css.petDescriptionItem}>
            <dt className={css.descKey}>Species</dt>
            <dd
              className={css.descData}
            >{`${pet.species.split("")[0].toUpperCase()}${pet.species.slice(1)}`}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
