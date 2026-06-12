import css from "./PetsBlock.module.css";
import AddPet from "../AddPet/AddPet";
import PetsList from "../PetsList/PetsList";

export default function PetsBlock () {

  return (
    <div className={css.petsBlockContainer}>
      <div className={css.petsBlockHeader}>
        <h2 className={css.heading}>My pets</h2>
        <AddPet />
      </div>

      <PetsList />
    </div>
  )
}