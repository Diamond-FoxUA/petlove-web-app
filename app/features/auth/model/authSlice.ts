import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/authTypes";
import type { ApiError } from "@/app/api/api";
import { getCurrentUser, signoutUser as signout } from "../api/authHandler";

interface AuthState {
  user: User | null;
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

export const refreshCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      return await getCurrentUser();
    } catch (error) {
      const axiosError = error as ApiError;

      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.error || "Failed refreshing session",
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
    setCredentials: (state, action: PayloadAction<User>) => {
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
      .addCase(refreshCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        refreshCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.isLoading = false;
        },
      )
      .addCase(refreshCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
