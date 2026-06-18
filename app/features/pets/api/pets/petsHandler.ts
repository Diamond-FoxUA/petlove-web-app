import { nextServer } from "@/app/shared/api/nextServer";
import type { UserFull } from "@/app/features/auth/types/authTypes";
import type { Pet } from "@/app/shared/types/noticesTypes";

export const addUserPet = async (
  petData: Omit<Pet, "_id" | "createdAt" | "updatedAt">,
): Promise<UserFull> => {
  const res = await nextServer.post("/users/current/pets/add", petData);
  return res.data;
};

export const removeUserPet = async (id: string): Promise<UserFull> => {
  const res = await nextServer.delete(`/users/current/pets/remove`, { data: { id } });
  return res.data;
}