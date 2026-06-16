import { nextServer } from "@/app/shared/api/nextServer";
import { loginFormData, registrationFormData } from "../schemas/authSchema";
import type { AuthResponse, User, UserFull } from "../types/authTypes";

export const register = async (
  formData: registrationFormData,
): Promise<AuthResponse> => {
  const data = { ...formData };
  delete (data as Partial<registrationFormData>).confirmPassword;

  const res = await nextServer.post<AuthResponse>("users/signup", data);
  return res.data;
};

export const login = async (data: loginFormData): Promise<AuthResponse> => {
  const res = await nextServer.post<AuthResponse>("users/signin", data);
  return res.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await nextServer.get<User>("/users/current");
  return res.data;
};

export const getCurrentUserFull = async (): Promise<UserFull> => {
  const res = await nextServer.get<UserFull>("/users/current/full");
  return res.data;
};

export const signoutUser = async (): Promise<{ message: string }> => {
  const res = await nextServer.post<{ message: string }>("/users/signout");
  return res.data;
};
