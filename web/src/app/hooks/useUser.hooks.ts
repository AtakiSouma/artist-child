import { useEffect } from "react";
import { PaginationParams } from "../models/global.models";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  fetchAllUserAsync,
  postInstructorCertsAsync,
} from "../redux/slice/userSlice";
import { InstructorCertsParams } from "../models/user.models";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function useUser() {
  const {
    currentPage,
    searchValue,
    userAdaptersByPage,
    pageCount,
    userLoading,
  } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const input: PaginationParams = {
    limit: 6,
    page: currentPage,
    search: searchValue,
  };
  const handleSubmitCerts = async (
    value: InstructorCertsParams,
    navigate: NavigateFunction
  ) => {
    const data = await dispatch(postInstructorCertsAsync(value));
    console.log(data);
    if (!data) {
      return false;
    }
    navigate("/instructor/wait");
    return true;
  };

  useEffect(() => {
    if (!userLoading) {
      dispatch(fetchAllUserAsync(input));
    }
  }, [userLoading, dispatch]);

  return {
    userLoading,
    pageCount,
    currentPage,
    searchValue,
    userAdaptersByPage,
    handleSubmitCerts,
  };
}
