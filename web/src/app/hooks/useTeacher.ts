/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { PaginationParams } from "../models/global.models";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchAllTeacherAsync, getInstructorDetailAsync } from "../redux/slice/teacherSlice";

export default function useTeacher() {
  const {
    currentPage,
    searchValue,
    teacherAdaptersByPage,
    pageCount,
    teacherLoading,
  } = useAppSelector((state) => state.teacher);

  const dispatch = useAppDispatch();
  const input: PaginationParams = {
    limit: 6,
    page: currentPage,
    search: searchValue,
  };

  const getInstructorDetail = async (id: string) => {
    const data = await dispatch(getInstructorDetailAsync(id))
    console.log(data)
    if (data) {
      return data
    }
  };

  useEffect(() => {
    if (!teacherLoading) {
      dispatch(fetchAllTeacherAsync(input));
    }
  }, [teacherLoading, dispatch]);
  return {
    teacherLoading,
    pageCount,
    currentPage,
    searchValue,
    teacherAdaptersByPage,
  };
}
