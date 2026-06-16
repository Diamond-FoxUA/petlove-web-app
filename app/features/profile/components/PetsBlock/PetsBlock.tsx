import css from "./PetsBlock.module.css";
import AddPet from "../AddPet/AddPet";
import PetsList from "../PetsList/PetsList";

export default function PetsBlock () {

  return (
    <section className={css.petsBlockContainer} aria-labelledby="user-pets-title">
      <div className={css.petsBlockHeader}>
        <h2 className={css.heading} id="user-pets-title">My pets</h2>
        <AddPet />
      </div>

      <PetsList />
    </section>
  )
}