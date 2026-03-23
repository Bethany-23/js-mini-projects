import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const song = action.payload;
      const index = state.findIndex((s) => s.id === song.id);
      if (index >= 0) {
        state.splice(index, 1); // Remove if already liked
      } else {
        state.push(song); // Add if new
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
