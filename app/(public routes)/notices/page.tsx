import NoticesPage from "@/app/features/notices/widgets/NoticesPage/NoticesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notices",
  description:
    "Find your perfect companion. Browse adorable pets waiting for a loving home and start your adoption journey today.",
};

export default function Notices() {
  return <NoticesPage />;
}
