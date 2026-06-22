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
  noticesFavorites: Notice[];
  pets: Pet[];
  createdAt: string;
  updatedAt: string;
}

export interface EditUser {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface AuthResponse {
  email: string;
  name: string;
  token: string;
}
