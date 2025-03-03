import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  fetchCoursesCountAsync,
  fetchCustomersCountAsync,
  fetchInstructorsCountAsync,
} from "../redux/slice/dashboardSlice";

export default function useDashboard() {
  const { dashboardLoading, countList } = useAppSelector(
    (state) => state.dashboard
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!dashboardLoading) {
      if (!countList.some((count) => count.title === "Course")) {
        dispatch(fetchCoursesCountAsync());
      }
      if (!countList.some((count) => count.title === "Customer")) {
        dispatch(fetchCustomersCountAsync());
      }
      if (!countList.some((count) => count.title === "Instructor")) {
        dispatch(fetchInstructorsCountAsync());
      }
    }
  }, [dispatch, dashboardLoading, countList]);
  return {
    dashboardLoading,
    countList,
  };
}
