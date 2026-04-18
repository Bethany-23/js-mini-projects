import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import favoritesReducer from "../features/favoritesSlice";
import commentsReducer from "../features/commentsSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    comments: commentsReducer,
  },
});

