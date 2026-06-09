import { nextServer } from "@/app/shared/api/nextServer";
import { registrationFormData } from "../schemas/registrationSchema";
import type { User } from "../types/authTypes";

export const register = async (formData: registrationFormData) => {
  const data = { ...formData };
  delete (data as Partial<registrationFormData>).confirmPassword;

  const res = await nextServer.post<User>("users/signup", data);
  return res.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await nextServer.get<User>("/users/current");
  return res.data;
};

export const signoutUser = async () => {
  const res = await nextServer.post("/users/signout");
  return res.data;
};