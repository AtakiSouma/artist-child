/* eslint-disable @typescript-eslint/no-explicit-any */

import { MetaData, PaginationParamsWithId } from "../../models/global.models";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { RootState } from "../store";
export interface ResultData {
  id: string;
  user: {
    _id: string;
    name: string;
  };
  course: {
    _id: string;
    name: string;
  };
  message: string;
  image: {
    public_id: string;
    url: string;
  };
  createdAt: string;
  status: boolean;
}

interface ResultState {
  resultLoading: boolean;
  isFetching: boolean;
  status: string;
  metaData: MetaData | null;
  totalCount: number;
  pageCount: number;
  currentPage: number;
  searchValue: string;
  resultAdaptersByPage: Record<number, ResultData[]>;
  displayError: string;
}
const initialState: ResultState = {
  resultLoading: false,
  isFetching: false,
  status: "loading",
  metaData: null,
  totalCount: 0,
  pageCount: 0,
  currentPage: 1,
  searchValue: "",
  resultAdaptersByPage: {},
  displayError: "",
};

export const fetchAllResultAsync = createAsyncThunk<
  ResultData[],
  PaginationParamsWithId,
  { state: RootState }
>("Result/fetchAllResultAsync", async (input, thunkAPI) => {
  try {
    const response = await agent.Result.getAllResult(input);
    console.log("user response: ", response);
    thunkAPI.dispatch(setPageCount(response.pageCount));
    thunkAPI.dispatch(setTotalCount(response.totalCount));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

const resultSlice = createSlice({
  name: "result",
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
    setResultLoading: (state, action) => {
      state.resultLoading = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllResultAsync.pending, (state) => {
      state.status = "pending fetch all  order";
      state.resultLoading = false;
    });
    builder.addCase(fetchAllResultAsync.fulfilled, (state, action) => {
      state.status = "fetch order";
      state.resultAdaptersByPage[action.meta.arg.page] = action.payload;
      state.resultLoading = true;
    });
    builder.addCase(fetchAllResultAsync.rejected, (state) => {
      state.status = "fetch Fail";
    });
  },
});
export const {
  setResultLoading,
  setCurrentPage,
  setPageCount,
  setSearchValue,
  setTotalCount,
} = resultSlice.actions;
export default resultSlice.reducer;
