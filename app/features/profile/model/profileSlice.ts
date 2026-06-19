import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser as updateUserApi } from "../api/updateUser";
import type { UserFull, EditUser } from "../../auth/types/authTypes";
import { ApiError } from "@/app/api/api";

export const updateUser = createAsyncThunk<
  UserFull,
  EditUser,
  { rejectValue: string }
>("auth/current/edit", async (userData, thunkAPI) => {
  try {
    const response = await updateUserApi(userData);
    return response;
  } catch (error) {
    const axiosError = error as ApiError;

    const message =
      axiosError.response?.data?.error ||
      axiosError.message ||
      "Failed to update profile";
    return thunkAPI.rejectWithValue(message);
  }
});
