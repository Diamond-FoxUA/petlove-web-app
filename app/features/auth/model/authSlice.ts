import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { UserFull } from "../types/authTypes";
import type { ApiError } from "@/app/api/api";
import {
  signoutUser as signout,
  getCurrentUserFull as getCurrentFull,
} from "../api/authHandler";
import { updateUser } from "../../profile/model/profileSlice";

import { Pet } from "@/app/shared/types/noticesTypes";
import { addUserPet, removeUserPet } from "../../pets/model/petSlice";

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
          if (state.user) {
            if (!state.user.pets) state.user.pets = [];
            state.user.pets = action.payload.pets;
          }
        },
      )
      .addCase(addUserPet.pending, (state) => {
        state.error = null;
      })
      .addCase(addUserPet.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        removeUserPet.fulfilled,
        (state, action: PayloadAction<string>) => {
          if (state.user && state.user.pets) {
            state.user.pets = state.user.pets.filter(
              (pet: Pet) => pet._id !== action.payload,
            );
          }
        },
      )
      .addCase(removeUserPet.pending, (state) => {
        state.error = null;
      })
      .addCase(removeUserPet.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<UserFull>) => {
          state.user = action.payload;
          state.error = null;
        },
      )
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
