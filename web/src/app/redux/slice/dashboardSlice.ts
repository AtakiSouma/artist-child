import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import agent from "../../utils/agent";
import { CountData } from "../../models/dashboard.model";

interface DashboardState {
  dashboardLoading: boolean;
  status: string;
  error: boolean;
  countList: CountData[];
}

const initialState: DashboardState = {
  dashboardLoading: false,
  status: "loading",
  error: false,
  countList: [],
};

export const fetchCoursesCountAsync = createAsyncThunk<
  Number,
  void,
  { state: RootState }
>("course/fetchCoursesCountAsync", async (_input, thunkAPI) => {
  try {
    const response = await agent.Course.getCoursesCount();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const fetchCustomersCountAsync = createAsyncThunk<
  Number,
  void,
  { state: RootState }
>("user/fetchCustomersCountAsync", async (_input, thunkAPI) => {
  try {
    const response = await agent.User.getCustomersCount();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const fetchInstructorsCountAsync = createAsyncThunk<
  Number,
  void,
  { state: RootState }
>("user/fetchInstructorsCountAsync", async (_input, thunkAPI) => {
  try {
    const response = await agent.User.getInstructorsCount();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardLoading: (state, action) => {
      state.dashboardLoading = action.payload;
    },
    setCountList: (state, action) => {
      state.countList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoursesCountAsync.pending, (state) => {
      state.status = "Pending fetch count";
      state.dashboardLoading = false;
    });
    builder.addCase(fetchCoursesCountAsync.fulfilled, (state, action) => {
      state.status = "Fetched count";
      state.countList.push({ title: "Course", count: action.payload });
      state.dashboardLoading = true;
    });
    builder.addCase(fetchCoursesCountAsync.rejected, (state) => {
      state.status = "Fetch count rejected";
      state.dashboardLoading = false;
    });
    builder.addCase(fetchCustomersCountAsync.pending, (state) => {
      state.status = "Pending fetch count";
      state.dashboardLoading = false;
    });
    builder.addCase(fetchCustomersCountAsync.fulfilled, (state, action) => {
      state.status = "Fetched count";
      state.countList.push({ title: "Customer", count: action.payload });
      state.dashboardLoading = true;
    });
    builder.addCase(fetchCustomersCountAsync.rejected, (state) => {
      state.status = "Fetch count rejected";
      state.dashboardLoading = false;
    });
    builder.addCase(fetchInstructorsCountAsync.pending, (state) => {
      state.status = "Pending fetch count";
      state.dashboardLoading = false;
    });
    builder.addCase(fetchInstructorsCountAsync.fulfilled, (state, action) => {
      state.status = "Fetched count";
      state.countList.push({ title: "Instructor", count: action.payload });
      state.dashboardLoading = true;
    });
    builder.addCase(fetchInstructorsCountAsync.rejected, (state) => {
      state.status = "Fetch count rejected";
      state.dashboardLoading = false;
    });
  },
});

export const { setDashboardLoading, setCountList } = dashboardSlice.actions;
export default dashboardSlice.reducer;
