import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../models/user.model";

interface UserProps {
  userData: UserData;
  isFetching: boolean;
  error: boolean;
  displayError: string;
  status: string;
}
const initialState: UserProps = {
  userData: {} as UserData,
  isFetching: false,
  error: false,
  displayError: "",
  status: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfoStart: (state) => {
      state.isFetching = true;
    },
    getUserInfoSuccessAddAuth: (state, action: PayloadAction<UserData>) => {
      state.isFetching = false;
      state.userData = action.payload;
      state.error = false;
    },
    getUserInfoFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});
export const {
  getUserInfoFailure,
  getUserInfoStart,
  getUserInfoSuccessAddAuth,
} = userSlice.actions;
export default userSlice.reducer;
