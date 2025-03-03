/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { PaginationParams } from "../models/global.models";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchAllOrderAsync } from "../redux/slice/orderSlice";

export default function useOrder() {
  const {
    currentPage,
    searchValue,
    orderAdaptersByPage,
    pageCount,
    orderLoading,
  } = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();
  const input: PaginationParams = {
    limit: 6,
    page: currentPage,
    search: searchValue,
  };

  useEffect(() => {
    if (!orderLoading) {
      dispatch(fetchAllOrderAsync(input));
    }
  }, [orderLoading, dispatch]);
  return {
    orderLoading,
    pageCount,
    currentPage,
    searchValue,
    orderAdaptersByPage,
  };
}
