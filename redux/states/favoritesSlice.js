import { createSlice } from "@reduxjs/toolkit";
import { saveFavorites } from "../../lib/favorites";

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      saveFavorites(action.payload)

      return [...state]
    }
  }
})

export const { addToFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;