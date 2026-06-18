import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserFull } from "../../auth/types/authTypes";
import type { ApiError } from "@/app/api/api";
import { Pet } from "@/app/shared/types/noticesTypes";
import {
  addUserPet as addPet,
  removeUserPet as removePet,
} from "../../pets/api/pets/petsHandler";

export const addUserPet = createAsyncThunk<
  UserFull,
  Omit<Pet, "_id" | "updatedAt" | "createdAt">
>("auth/addUserPet", async (petData, thunkAPI) => {
  try {
    return await addPet(petData);
  } catch (error) {
    const axiosError = error as ApiError;

    return thunkAPI.rejectWithValue(
      axiosError.response?.data.error || "Failed adding user pet",
    );
  }
});

export const removeUserPet = createAsyncThunk(
  "auth/removeUserPet",
  async (id: string, thunkAPI) => {
    try {
      await removePet(id);
      return id;
    } catch (error) {
      const axiosError = error as ApiError;

      return thunkAPI.rejectWithValue(
        axiosError.response?.data.error || "Failed removing user pet",
      );
    }
  },
);
