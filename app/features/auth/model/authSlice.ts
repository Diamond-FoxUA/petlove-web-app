import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { UserFull } from "../types/authTypes";
import type { ApiError } from "@/app/api/api";
import {
  signoutUser as signout,
  getCurrentUserFull as getCurrentFull,
} from "../api/authHandler";
import {
  addUserPet as addPet,
  removeUserPet as removePet,
} from "../../profile/api/pets/petsHandler";

import { Pet } from "@/app/shared/types/noticesTypes";

interface AuthState {
  user: UserFull | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const getCurrentUserFull = createAsyncThunk(
  "auth/current/full",
  async (_, thunkAPI) => {
    try {
      const res = await getCurrentFull();

      if (res && typeof res === "object" && "error" in res) {
        const errorData = res as unknown as { error: string };
        return thunkAPI.rejectWithValue(errorData.error || "Unauthorized");
      }

      return res;
    } catch (error) {
      const axiosError = error as ApiError;

      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.error || "Failed getting current full user",
      );
    }
  },
);

export const signoutUser = createAsyncThunk(
  "auth/signout",
  async (_, thunkAPI) => {
    try {
      return await signout();
    } catch (error) {
      const axiosError = error as ApiError;

      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.error || "Failed signing out user",
      );
    }
  },
);

export const addUserPet = createAsyncThunk(
  "auth/addUserPet",
  async (petData: Omit<Pet, "_id" | "updatedAt">, thunkAPI) => {
    try {
      return await addPet(petData);
    } catch (error) {
      const axiosError = error as ApiError;

      return thunkAPI.rejectWithValue(
        axiosError.response?.data.error || "Failed adding user pet",
      );
    }
  },
);

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserFull>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserFull.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getCurrentUserFull.fulfilled,
        (state, action: PayloadAction<UserFull>) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.isLoading = false;
        },
      )
      .addCase(getCurrentUserFull.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(
        addUserPet.fulfilled,
        (state, action: PayloadAction<UserFull>) => {
          state.isLoading = false;
          if (state.user) {
            if (!state.user.pets) state.user.pets = [];
            state.user.pets = action.payload.pets;
          }
        },
      )
      .addCase(addUserPet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUserPet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        removeUserPet.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          if (state.user && state.user.pets) {
            state.user.pets = state.user.pets.filter(
              (pet: Pet) => pet._id !== action.payload,
            );
          }
        },
      )
      .addCase(removeUserPet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeUserPet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
