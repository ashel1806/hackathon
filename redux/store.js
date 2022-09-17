import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '../redux/states/favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  },
})