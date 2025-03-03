import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Course } from "../../models/course.model";
import { RootState } from "../store";
import courseApi from "../../api/courseApi";

interface courseState {
  courseLoading: boolean;
  isFetching: boolean;
  status: string;
  courseData: Course;
}
const initialState: courseState = {
  courseLoading: false,
  isFetching: false,
  status: "s",
  courseData: {} as Course,
};
export const fetchCourseDetailAsync = createAsyncThunk<
  Course, // Define the return type of the thunk function
  string, // Define the type of the `id` parameter
  { state: RootState }
>("courseDetail/fetchCourseDetailAsync", async (id, thunkAPI) => {
  if (!id || typeof id !== "string") {
    return thunkAPI.rejectWithValue({ error: "Invalid id" });
  }

  try {
    const api = `/course-detail/${id}`;
    const response = await courseApi.HandleEvent(api, {}, "get");
    console.log("course detail response: ", response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseLoading: (state, action) => {
      state.courseLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourseDetailAsync.pending, (state) => {
      state.status = "pending fetch all  order";
      state.courseLoading = false;
    });
    builder.addCase(fetchCourseDetailAsync.fulfilled, (state, action) => {
      state.status = "fetch order";
      state.courseData = action.payload;
      state.courseLoading = true;
    });
    builder.addCase(fetchCourseDetailAsync.rejected, (state) => {
      state.status = "fetch Fail";
      state.courseLoading = true;

    });
  },
});
export const { setCourseLoading } = courseSlice.actions;
export default courseSlice.reducer;
