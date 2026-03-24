import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// CREATE
export const postComment = createAsyncThunk(
  "comments/post",
  async (commentData) => {
    const docRef = await addDoc(collection(db, "comments"), commentData);
    return { id: docRef.id, ...commentData };
  },
);

// READ
export const loadComments = createAsyncThunk(
  "comments/load",
  async (songId) => {
    const q = query(collection(db, "comments"), where("songId", "==", songId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  },
);

// UPDATE
export const editComment = createAsyncThunk(
  "comments/edit",
  async ({ id, newText }) => {
    await updateDoc(doc(db, "comments", id), { text: newText });
    return { id, newText };
  },
);

// DELETE
export const deleteComment = createAsyncThunk("comments/delete", async (id) => {
  await deleteDoc(doc(db, "comments", id));
  return id;
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: { items: [] },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.items[index].text = action.payload.newText;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
