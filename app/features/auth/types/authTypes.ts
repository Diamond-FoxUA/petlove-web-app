import type { Notice, Pet } from "@/app/shared/types/noticesTypes";

export interface User {
  _id: string;
  name: string;
  token: string;
  noticesFavourites: Notice[];
}

export interface UserFull extends User {
  email: string;
  avatar: string;
  phone: string;
  noticesViewed: Notice[];
  noticesFavourites: Notice[];
  pets: Pet[];
  createdAt: string;
  updatedAt: string;
}
