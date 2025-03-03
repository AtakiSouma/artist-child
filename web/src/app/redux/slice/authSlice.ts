import {
  CurrentUser,
  UserData,
  UserRegisterParams,
} from "../../models/auth.models";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";

interface UserProps {
  currentUser: CurrentUser;
  isFetching: boolean;
  error: boolean;
  displayError: string;
  status: string;
  googleUser: UserData;
}

const initialState: UserProps = {
  currentUser: {} as CurrentUser,
  isFetching: false,
  error: false,
  displayError: "",
  status: "",
  googleUser: {} as UserData,
};
export const createAccounts = createAsyncThunk(
  "account/createAccountAsync",

  async (requestData: UserRegisterParams) => {
    try {
      const response = await agent.User.register(requestData);
      return { message: response.message, status: response.status };
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.error,
          status: error.response?.status,
        };
      }
    }
    return { message: "Something went wrong..." };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<CurrentUser>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
    loginSuccessWithGoogle: (state, action: PayloadAction<UserData>) => {
      state.isFetching = false;
      state.googleUser = action.payload;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAccounts.pending, (state) => {
      state.isFetching = true;
      state.status = "pending create";
    });
    builder.addCase(createAccounts.fulfilled, (state) => {
      state.isFetching = false;
      state.status = " create successfully";
    });
    builder.addCase(createAccounts.rejected, (state) => {
      state.isFetching = false;
      state.status = "rejected create";
      // state.displayError = action.payload;
    });
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  loginSuccessWithGoogle,
} = authSlice.actions;

export default authSlice.reducer;
