import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CurrentUser {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}
const CurrentUserNull = {
  id: "",
  name: "",
  email: "",
  photo: "",
  familyName: "",
  givenName: "",
};
interface UserProps {
  currentUser: CurrentUser;
  isFetching: boolean;
  error: boolean;
  displayError: string;
  status: string;
}

const initialState: UserProps = {
  currentUser: {} as CurrentUser,
  isFetching: false,
  error: false,
  displayError: "",
  status: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccessAddAuth: (state, action: PayloadAction<CurrentUser>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
    removeAuth: (state) => {
      state.currentUser = CurrentUserNull;
    },
  },
});

export const { loginStart, loginSuccessAddAuth, loginFailure, removeAuth } =
  authSlice.actions;

export default authSlice.reducer;
