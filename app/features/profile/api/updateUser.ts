import { nextServer } from "@/app/shared/api/nextServer";
import type { EditUser } from "../../auth/types/authTypes";

export const updateUser = async (data: EditUser) => {
  const res = await nextServer.patch("/users/current/edit", data);
  return res.data;
};
