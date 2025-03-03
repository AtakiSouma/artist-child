import { AxiosResponse } from "axios";
import apiJWT from "./apiJWT";
import baseApi from "./baseApi";
import { PaginationParams } from "../models/pagination.model";
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: <T>(url: string, params?: T) =>
    apiJWT.get(url, { params }).then(responseBody),
  post: <T>(url: string, body: T) => apiJWT.post(url, body).then(responseBody),
  put: <T>(url: string, body: T) => apiJWT.put(url, body).then(responseBody),
  del: <T>(url: string, params?: T) =>
    apiJWT.delete(url, { params }).then(responseBody),
  baseApiGet: <T>(url: string, params?: T) =>
    baseApi.get(url, { params }).then(responseBody),
  baseApiPost: <T>(url: string, body: T) =>
    baseApi.post(url, body).then(responseBody),
  baseApiPut: <T>(url: string, body: T) =>
    baseApi.put(url, body).then(responseBody),
  baseApiPatch: <T>(url: string, body: T) =>
    baseApi.patch(url, body).then(responseBody),
  baseApiDelete: <T>(url: string, params?: T) =>
    baseApi.delete(url, { params }).then(responseBody),
  baseApiUpdateStatus: <T>(url: string, params?: T) =>
    baseApi.patch(url, { params }).then(responseBody),
};

const Course = {
  getAllCourse: (input: PaginationParams) =>
    requests.post("/api/v1/course/get-all", {
      page: input.page,
      size: input.size,
      search: input.search,
    }),
};
const agent = {
  Course,
};
export default agent;
