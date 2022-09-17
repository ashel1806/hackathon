import { createSlice } from "@reduxjs/toolkit";
import { saveFavorites, getAllFavorites, removeFromFavorites } from "../../lib/favorites";

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: getAllFavorites() || [],
  reducers: {
    addToFavorites: (state, action) => {
      state.push(action.payload);
      saveFavorites(action.payload);
    },
    removeFavorites: (state, action) => {
      removeFromFavorites(action.payload);

      return state.filter((course) => course !== action.payload)
    }
  }
})

export const { addToFavorites, removeFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;