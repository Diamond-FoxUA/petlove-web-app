"use client";

import css from "./PetsList.module.css";
import { useAppSelector } from "@/app/shared/redux/hooks";
import { useAppDispatch } from "@/app/shared/redux/hooks";
import { removeUserPet } from "@/app/features/auth/model/authSlice";

import PetsItem from "../PetsItem/PetsItem";

export default function PetsList() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const pets = user?.pets || [];

  const handleDelete = (id: string) => {
    dispatch(removeUserPet(id));
  };

  if (pets.length === 0)
    return (
      <p role="status" className={css.message}>
        It seems{" "}
        <strong className={css.textAccent}>
          you haven&apos;t added any pets
        </strong>{" "}
        to your profile yet. Click the &quot;Add Pet&quot; button above to get
        started!
      </p>
    );

  return (
    <ul className={css.petsList}>
      {user?.pets.map((pet) => (
        <li key={pet._id}>
          <PetsItem pet={pet} deleteUserPet={() => handleDelete(pet._id)} />
        </li>
      ))}
    </ul>
  );
}
