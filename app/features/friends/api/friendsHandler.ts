import { api } from "@/app/api/api";
import type { Friend } from "../types/friendsTypes";

export const getFriends = async (): Promise<Friend[]> => {
  const res = await api.get<Friend[]>("/friends");
  return res.data;
};
