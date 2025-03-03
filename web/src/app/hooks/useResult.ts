/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { PaginationParamsWithId } from "../models/global.models";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchAllResultAsync } from "../redux/slice/resultSlice";

import { UserData } from "../models/auth.models";

export default function useResult() {
  const {
    currentPage,
    searchValue,
    resultAdaptersByPage,
    pageCount,
    resultLoading,
  } = useAppSelector((state) => state.result);

  const dispatch = useAppDispatch();
  const userDataObject: UserData = JSON.parse(localStorage.getItem("user")!);
  const input: PaginationParamsWithId = {
    limit: 6,
    page: currentPage,
    search: searchValue,
    instructorId: userDataObject.user.id,
  };

  useEffect(() => {
    if (!resultLoading) {
      dispatch(fetchAllResultAsync(input));
    }
  }, [resultLoading, dispatch]);
  return {
    resultLoading,
    pageCount,
    currentPage,
    searchValue,
    resultAdaptersByPage,
  };
}
