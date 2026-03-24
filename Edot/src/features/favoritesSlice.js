import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../services/firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// LOAD: Pull only Bethany's favorites from the Cloud
export const fetchFavorites = createAsyncThunk("favs/fetch", async (userId) => {
  const q = query(collection(db, "favorites"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ firebaseId: d.id, ...d.data() }));
});

// TOGGLE: Add or Remove from Cloud
export const toggleFavorite = createAsyncThunk(
  "favs/toggle",
  async ({ song, userId }, { getState }) => {
    const { favorites } = getState();
    const existing = favorites.items.find((f) => f.id === song.id);

    if (existing) {
      await deleteDoc(doc(db, "favorites", existing.firebaseId));
      return { type: "remove", id: song.id };
    } else {
      const newDocRef = doc(collection(db, "favorites"));
      const favData = { ...song, userId, createdAt: Date.now() };
      await setDoc(newDocRef, favData);
      return { type: "add", song: { ...favData, firebaseId: newDocRef.id } };
    }
  },
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { items: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (action.payload.type === "remove") {
          state.items = state.items.filter((f) => f.id !== action.payload.id);
        } else {
          state.items.push(action.payload.song);
        }
      });
  },
});

export default favoritesSlice.reducer;
