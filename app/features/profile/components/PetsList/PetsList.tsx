"use client";

import css from "./PetsList.module.css";
import { useAppSelector } from "@/app/shared/redux/hooks";
import PetsItem from "../PetsItem/PetsItem";

export default function PetsList() {
  const { user } = useAppSelector((state) => state.auth);

  if (user?.pets.length === 0)
    return (
      <p role="status" className={css.message}>
        It seems <strong className={css.textAccent}>you haven&apos;t added any pets</strong> to your profile yet. Click the
        &quot;Add Pet&quot; button above to get started!
      </p>
    );

  return (
    <ul className={css.petsList}>
      <PetsItem />
    </ul>
  );
}
