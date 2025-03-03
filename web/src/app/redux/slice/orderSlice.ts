/* eslint-disable @typescript-eslint/no-explicit-any */

import { MetaData, PaginationParams } from "../../models/global.models";
import { OrderData } from "../../models/order.models";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { RootState } from "../store";

interface OrderState {
  orderLoading: boolean;
  isFetching: boolean;
  status: string;
  metaData: MetaData | null;
  totalCount: number;
  pageCount: number;
  currentPage: number;
  searchValue: string;
  orderAdaptersByPage: Record<number, OrderData[]>;
  displayError: string;
}
const initialState: OrderState = {
  orderLoading: false,
  isFetching: false,
  status: "loading",
  metaData: null,
  totalCount: 0,
  pageCount: 0,
  currentPage: 1,
  searchValue: "",
  orderAdaptersByPage: {},
  displayError: "",
};

export const fetchAllOrderAsync = createAsyncThunk<
  OrderData[],
  PaginationParams,
  { state: RootState }
>("order/fetchAllOrderAsync", async (input, thunkAPI) => {
  try {
    const response = await agent.Order.getAllOrder(input);
    console.log("user response: ", response);
    thunkAPI.dispatch(setPageCount(response.pageCount));
    thunkAPI.dispatch(setTotalCount(response.totalCount));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

const orderSlice = createSlice({
  name: "order",
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
    setOrderLoading: (state, action) => {
      state.orderLoading = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrderAsync.pending, (state) => {
      state.status = "pending fetch all  order";
      state.orderLoading = false;
    });
    builder.addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
      state.status = "fetch order";
      state.orderAdaptersByPage[action.meta.arg.page] = action.payload;
      state.orderLoading = true;
    });
    builder.addCase(fetchAllOrderAsync.rejected, (state) => {
      state.status = "fetch Fail";
    });
  },
});
export const {
  setOrderLoading,
  setCurrentPage,
  setPageCount,
  setSearchValue,
  setTotalCount,
} = orderSlice.actions;
export default orderSlice.reducer;
