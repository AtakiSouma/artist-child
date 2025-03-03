import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface BookmarkState {
  bookmarkedItems: string[]; // Assuming itemId is a string
}

const initialState: BookmarkState = {
  bookmarkedItems: [],
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.bookmarkedItems.indexOf(itemId);

      if (index === -1) {
        state.bookmarkedItems.push(itemId);
      } else {
        state.bookmarkedItems = state.bookmarkedItems.filter(
          (id) => id !== itemId
        );
      }
      AsyncStorage.setItem("bookmarks", JSON.stringify(state.bookmarkedItems));
    },
    loadBookmarks: (state) => {
      // Load bookmarks from AsyncStorage
      AsyncStorage.getItem("bookmarks").then((bookmarksString) => {
        if (bookmarksString) {
          state.bookmarkedItems = JSON.parse(bookmarksString);
        }
      });
    },
  },
});
export const { toggleBookmark ,loadBookmarks} = bookmarkSlice.actions;

export default bookmarkSlice;
