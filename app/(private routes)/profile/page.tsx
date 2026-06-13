import css from "./page.module.css";
import UserCard from "@/app/features/profile/components/UserCard/UserCard";

export default function Profile () {
  return (
    <section className={`container ${css.profileContainer}`}>
      <UserCard />
      {/* MyNotices */}
    </section>
  )
}