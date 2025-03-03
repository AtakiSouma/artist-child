import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  InstructorCertsParams,
  TeachersData,
  UserData,
} from "../../models/user.models";
import { MetaData, PaginationParams } from "../../models/global.models";
import { RootState } from "../store";
import agent from "../../utils/agent";

interface UserState {
  userLoading: boolean;
  isFetching: boolean;
  status: string;
  metaData: MetaData | null;
  totalCount: number;
  pageCount: number;
  currentPage: number;
  searchValue: string;
  userAdaptersByPage: Record<number, UserData[]>;
  displayError: string;
}
const initialState: UserState = {
  userLoading: false,
  isFetching: false,
  status: "loading",
  metaData: null,
  totalCount: 0,
  pageCount: 0,
  currentPage: 1,
  searchValue: "",
  userAdaptersByPage: {},
  displayError: "",
};

export const fetchAllUserAsync = createAsyncThunk<
  UserData[],
  PaginationParams,
  { state: RootState }
>("user/fetchAllUserAsync", async (input, thunkAPI) => {
  try {
    const response = await agent.User.getAllUsers(input);
    console.log("user response: ", response);
    thunkAPI.dispatch(setPageCount(response.pageCount));
    thunkAPI.dispatch(setTotalCount(response.totalCount));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const postInstructorCertsAsync = createAsyncThunk<
  UserData[],
  InstructorCertsParams,
  { state: RootState }
>("user/postInstructorCertsAsync", async (input, thunkAPI) => {
  try {
    const user = localStorage.getItem("user");
    const userObj = user ? JSON.parse(user) : {};
    console.log("userObj:", userObj);
    const response = await agent.User.postInstructorCerts(
      userObj.user.id,
      input
    );
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUserAsync.pending, (state) => {
      state.status = "pending fetch all user";
      state.userLoading = false;
    });
    builder.addCase(fetchAllUserAsync.fulfilled, (state, action) => {
      state.status = "fetch user";
      state.userAdaptersByPage[action.meta.arg.page] = action.payload;
      state.userLoading = true;
    });
    builder.addCase(fetchAllUserAsync.rejected, (state) => {
      state.status = "fetch Fail";
    });
  },
});

export const {
  setCurrentPage,
  setPageCount,
  setSearchValue,
  setTotalCount,
  setUserLoading,
} = userSlice.actions;

export default userSlice.reducer;
