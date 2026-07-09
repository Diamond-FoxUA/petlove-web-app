import NewsPage from "@/app/features/news/widgets/NewsPage/NewsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description:
    "Discover recent news, expert care tips, and trending stories at Petlove",
};

export default function News() {
  return <NewsPage />;
}
