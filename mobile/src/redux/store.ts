import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slide/authSlice";
import bookmarkSlice from "./slide/addWish";
import userSlice from "./slide/userSlice";
import courseSlice from "./slide/useCourse";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    bookmark: bookmarkSlice.reducer,
    user: userSlice,
    course: courseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type PayloadAction<T, Type extends string, Payload = T> = {
  payload?: Payload;
  type: Type;
};
