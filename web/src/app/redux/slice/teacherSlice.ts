import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { MetaData, PaginationParams } from "../../models/global.models";
import { RootState } from "../store";
import { TeachersData } from "../../models/user.models";

interface TeacherState {
  teacherLoading: boolean;
  isFetching: boolean;
  status: string;
  metaData: MetaData | null;
  totalCount: number;
  pageCount: number;
  currentPage: number;
  searchValue: string;
  teacherAdaptersByPage: Record<number, TeachersData[]>;
  displayError: string;
}

const initialState: TeacherState = {
  teacherLoading: false,
  isFetching: false,
  status: "loading",
  metaData: null,
  totalCount: 0,
  pageCount: 0,
  currentPage: 1,
  searchValue: "",
  teacherAdaptersByPage: {},
  displayError: "",
};

export const fetchAllTeacherAsync = createAsyncThunk<
  TeachersData[],
  PaginationParams,
  { state: RootState }
>("teacher/fetchAllTeacherAsync", async (input, thunkAPI) => {
  try {
    const response = await agent.User.getAllTeachers(input);
    console.log("user response: ", response);
    thunkAPI.dispatch(setPageCount(response.pageCount));
    thunkAPI.dispatch(setTotalCount(response.totalCount));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const getInstructorDetailAsync = createAsyncThunk<
  TeachersData,
  string,
  { state: RootState }
>("user/getUserDetailAsync", async (input, thunkAPI) => {
  try {
    const response = await agent.User.getInstructorDetail(input);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

const teacherSlice = createSlice({
  name: "teacher",
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
    setTeacherLoading: (state, action) => {
      state.teacherLoading = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTeacherAsync.pending, (state) => {
      state.status = "pending fetch all user";
      state.teacherLoading = false;
    });
    builder.addCase(fetchAllTeacherAsync.fulfilled, (state, action) => {
      state.status = "fetch user";
      state.teacherAdaptersByPage[action.meta.arg.page] = action.payload;
      state.teacherLoading = true;
    });
    builder.addCase(fetchAllTeacherAsync.rejected, (state) => {
      state.status = "fetch Fail";
    });
  },
});
export const {
  setTeacherLoading,
  setCurrentPage,
  setPageCount,
  setSearchValue,
  setTotalCount,
} = teacherSlice.actions;

export default teacherSlice.reducer;
