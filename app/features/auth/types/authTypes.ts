import type { Notice } from "@/app/shared/types/noticesTypes";

export type User = {
  id: string;
  name: string;
  token: string;
  noticesFavourites: Notice[];
};