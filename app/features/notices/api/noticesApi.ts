import { api } from "@/app/api/api";

export const getSpecies = async () => {
  const res = await api.get("/notices/species");
  return res.data;
} 