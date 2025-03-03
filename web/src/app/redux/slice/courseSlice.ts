/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { MetaData, PaginationParams } from "../../models/global.models";
import { CourseData } from "../../models/course.model";
import { RootState } from "../store";

interface CourseState {
  courseLoading: boolean;
  isFetching: boolean;
  status: string;
  metaData: MetaData | null;
  totalCount: number;
  pageCount: number;
  currentPage: number;
  searchValue: string;
  courseAdaptersByPage: Record<number, CourseData[]>;
  displayError: string;
}
const initialState: CourseState = {
  courseLoading: false,
  isFetching: false,
  status: "loading",
  metaData: null,
  totalCount: 0,
  pageCount: 0,
  currentPage: 1,
  searchValue: "",
  courseAdaptersByPage: {},
  displayError: "",
};
export const createCourseAsync = createAsyncThunk(
  "course/createCourse",
  async (data: any) => {
    try {
      const response = await agent.Course.createCourse(data);
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.error.message,
          status: error.response?.status,
        };
      }
    }
  }
);

export const fetchAllCourseAsync = createAsyncThunk<
  CourseData[],
  PaginationParams,
  { state: RootState }
>("course/fetchAllCourseAsync", async (input, thunkAPI) => {
  try {
    const response = await agent.Course.getAllCourse(input);
    console.log("user response: ", response);
    thunkAPI.dispatch(setPageCount(response.pageCount));
    thunkAPI.dispatch(setTotalCount(response.totalCount));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});


const courseSlice = createSlice({
  name: "course",
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
    setCourseLoading: (state, action) => {
      state.courseLoading = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCourseAsync.pending, (state) => {
      state.status = "pending fetch all user";
      state.courseLoading = false;
    });
    builder.addCase(fetchAllCourseAsync.fulfilled, (state, action) => {
      state.status = "fetch user";
      state.courseAdaptersByPage[action.meta.arg.page] = action.payload;
      state.courseLoading = true;
    });
    builder.addCase(fetchAllCourseAsync.rejected, (state) => {
      state.status = "fetch Fail";
    });
  },
});
export const {
  setCourseLoading,
  setCurrentPage,
  setPageCount,
  setSearchValue,
  setTotalCount,
} = courseSlice.actions;

export default courseSlice.reducer;
