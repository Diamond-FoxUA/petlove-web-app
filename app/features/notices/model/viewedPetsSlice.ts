import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUserFull, signoutUser } from "../../auth/model/authSlice";
import type { Notice } from "@/app/shared/types/noticesTypes";
import type { UserFull, User } from "../../auth/types/authTypes";

interface ViewedPetsState {
  viewedPets: Notice[];
}

const initialState: ViewedPetsState = {
  viewedPets: [],
};

const viewedPetsSlice = createSlice({
  name: "viewedPets",
  initialState,
  reducers: {
    addViewedPet: (state, action: PayloadAction<Notice>) => {
      const pet = action.payload;
      const exists = state.viewedPets.some((item) => item._id === pet._id);

      if (!exists) {
        state.viewedPets.unshift(pet);
      }
    },
    setInitialViewed: (state, action: PayloadAction<Notice[]>) => {
      state.viewedPets = action.payload;
    },
    clearViewedPets: (state) => {
      state.viewedPets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signoutUser.fulfilled, (state) => {
        state.viewedPets = [];
      })
      .addCase(getCurrentUserFull.fulfilled, (state, action) => {
        if (state.viewedPets.length > 0) return;

        const payload = action.payload as User | UserFull | null;

        if (payload && "noticesFavorites" in payload) {
          const favouritePets = payload.noticesFavorites;

          if (favouritePets && Array.isArray(favouritePets)) {
            state.viewedPets.push(...favouritePets);
          }
        }
      });
  },
});

export const { addViewedPet, setInitialViewed, clearViewedPets } =
  viewedPetsSlice.actions;
export default viewedPetsSlice.reducer;
