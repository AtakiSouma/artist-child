import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Role {
  role: string;
  isFetching: boolean;
  error: boolean;
}
const initialState: Role = {
  role: "",
  isFetching: false,
  error: false,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    roleCheckStart: (state) => {
      state.isFetching = true;
    },
    roleCheckSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.role = action.payload;
      state.error = false;
    },
    roleCheckFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { roleCheckStart, roleCheckSuccess, roleCheckFailure } =
  roleSlice.actions;

export default roleSlice.reducer;
