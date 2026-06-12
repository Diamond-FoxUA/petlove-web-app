import css from "./AddPet.module.css";
import LinkButton from "@/app/shared/components/LinkButton/LinkButton";

export default function AddPet () {
  return (
    <LinkButton className={css.link} href="/add-pet">Add Pet +</LinkButton>
  )
}