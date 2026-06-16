import css from "./page.module.css";
import UserCard from "@/app/features/profile/components/UserCard/UserCard";
import Title from "@/app/shared/components/Title/Title";

export default function Profile () {
  return (
    <section className={`container ${css.profileContainer}`}>
      <Title text="Profile dashboard" className="sr-only"/>

      <UserCard />
      
      {/* MyNotices */}
    </section>
  )
}