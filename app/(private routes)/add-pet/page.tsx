import css from "./page.module.css";

import PetBlock from "@/app/shared/components/PetBlock/PetBlock";
import AddPetForm from "@/app/features/pets/components/AddPetForm/AddPetForm";

export default function AddPet() {

  return (
    <section
      className={`container ${css.addPetContainer}`}
      aria-labelledby="add-pet-title"
    >
      <PetBlock isAddPet={true} alt="Brown dog wearing yellow glasses" />

      <div className={css.formContainer}>
        <header className={css.formHeader}>
          <h1 className={css.title}>
            Add my pet <span aria-hidden="true">/</span>
          </h1>
          &nbsp;
          <small className={css.subTitle}>Personal details</small>
        </header>

        <AddPetForm />
      </div>
    </section>
  );
}
