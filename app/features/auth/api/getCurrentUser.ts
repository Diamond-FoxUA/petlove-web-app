import { nextServer } from "@/app/shared/api/nextServer";
import type { User } from "../types/authTypes";

export const getCurrentUser = async (): Promise<User> => {
  const res = await nextServer.get<User>("/users/current");
  return res.data;
};
