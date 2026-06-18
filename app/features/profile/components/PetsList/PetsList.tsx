import css from "./PetsList.module.css";

import { useAppSelector } from "@/app/shared/redux/hooks";
import { useAppDispatch } from "@/app/shared/redux/hooks";
import { removeUserPet } from "@/app/features/auth/model/authSlice";

import PetsItem from "../PetsItem/PetsItem";
import { toast } from "sonner";

export default function PetsList() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleDelete = async (id: string, title: string) => {
    if (!id) return;

    try {
      await dispatch(removeUserPet(id)).unwrap();

      toast.success(`Your pet profile "${title}" was deleted!`);
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : "Oops... Something went wrong";

      toast.error(errorMessage);
    }
  };

  const pets = user?.pets || [];

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
      {pets.map((pet) => (
        <li key={pet._id}>
          <PetsItem
            pet={pet}
            deleteUserPet={() => handleDelete(pet._id, pet.title)}
          />
        </li>
      ))}
    </ul>
  );
}
