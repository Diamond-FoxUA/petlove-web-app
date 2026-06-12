"use client";

import css from "./PetsList.module.css";
import { useAppSelector } from "@/app/shared/redux/hooks";
import PetsItem from "../PetsItem/PetsItem";

export default function PetsList() {
  const { user } = useAppSelector((state) => state.auth);

  if (user?.pets.length === 0)
    return (
      <span className={css.message}>
        It seems <span className={css.textAccent}>you haven&apos;t added any pets</span> to your profile yet. Click the
        &quot;Add Pet&quot; button above to get started!
      </span>
    );

  return (
    <ul className={css.petsList}>
      <PetsItem />
    </ul>
  );
}
