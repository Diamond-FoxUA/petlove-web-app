import css from "./page.module.css";
import Title from "@/app/shared/components/Title/Title";
import FriendsList from "@/app/features/friends/components/FriendsList/FriendsList";

export default function Friends() {
  return (
    <section className={`container ${css.friendsContainer}`}>
      <Title text="Our friends"/>
      <FriendsList />
    </section>
  )
}