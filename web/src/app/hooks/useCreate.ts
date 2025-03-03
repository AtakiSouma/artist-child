/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { PaginationParams } from "../models/global.models";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchAllCourseAsync } from "../redux/slice/courseSlice";

export default function useCourse() {
  const {
    currentPage,
    searchValue,
    courseAdaptersByPage,
    pageCount,
    courseLoading,
  } = useAppSelector((state) => state.course);

  const dispatch = useAppDispatch();
  const input: PaginationParams = {
    limit: 6,
    page: currentPage,
    search: searchValue,
  };

  useEffect(() => {
    if (!courseLoading) {
      dispatch(fetchAllCourseAsync(input));
    }
  }, [courseLoading, dispatch]);
  return {
    courseLoading,
    pageCount,
    currentPage,
    searchValue,
    courseAdaptersByPage,
  };
}
