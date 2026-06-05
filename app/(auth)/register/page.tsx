import Title from "@/app/components/Title/Title";
import PetBlock from "@/app/components/PetBlock/PetBlock";
import { PETBLOCK_IMAGES } from "@/app/assets/images";

export default function Register() {
  const { mobReg, tabReg, deskReg } = PETBLOCK_IMAGES;
  return (
    <div className="container">
      <PetBlock alt="Image" mob={mobReg} tab={tabReg} desk={deskReg} />
      <Title text="Registration" />
      {/* RegistationForm */}
    </div>
  );
}
