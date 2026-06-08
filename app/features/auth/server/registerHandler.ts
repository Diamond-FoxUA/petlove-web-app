import { nextServer } from "@/app/shared/api/nextServer";
import { registrationFormData } from "../schemas/registrationSchema";

export type Notice = {
  id: string;
  species: string;
  category: string;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  createdAt: string;
  user: string;
  popularity: number;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  token: string;
  noticesFavourites: Notice[];
};

export const register = async (formData: registrationFormData) => {
  const { confirmPassword, ...data } = formData;
  const res = await nextServer.post<User>("users/signup", data);

  return res.data;
};
