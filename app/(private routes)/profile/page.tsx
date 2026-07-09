import css from "./page.module.css";
import { Metadata } from "next";

import UserCard from "@/app/features/profile/components/UserCard/UserCard";
import Title from "@/app/shared/components/Title/Title";
import MyNotices from "@/app/features/profile/components/MyNotices/MyNotices";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Manage your Petlove profile, update your personal information, contact details, and view your listed pets all in one secure place.",
};

export default function Profile() {
  return (
    <section className={`container ${css.profileContainer}`}>
      <Title text="Profile dashboard" className="sr-only" />

      <UserCard />

      <MyNotices />
    </section>
  );
}
