/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import apiJWT from "./apiJwt";
import baseApi from "./BaseApi";
import { UserRegisterParams } from "../models/auth.models";
import { InstructorCertsParams } from "../models/user.models";
import {
  PaginationParams,
  PaginationParamsWithId,
  replyParams,
} from "../models/global.models";

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
const User = {
  register: (input: UserRegisterParams) =>
    requests.baseApiPost("/api/v1/user/register", {
      email: input.email,
      name: input.name,
      password: input.password,
      confirmPassword: input.confirmPassword,
    }),
  getAllUsers: (input: PaginationParams) =>
    requests.post("/api/v1/user/get-all", {
      page: input.page,
      limit: input.limit,
      search: input.search,
    }),
  getCustomersCount: () =>
    requests.get("/api/v1/user/dashboard/instructorsCount"),

  getInstructorsCount: () =>
    requests.get("/api/v1/user/dashboard/customersCount"),
  postInstructorCerts: (id: string, input: InstructorCertsParams) =>
    requests.put(`/api/v1/user/instructor/postCerts/${id}`, {
      listCerts: input.listCerts,
    }),
  getAllTeachers: (input: PaginationParams) =>
    requests.post("/api/v1/user/instructors/get-all", {
      page: input.page,
      limit: input.limit,
      search: input.search,
    }),
  getInstructorDetail: (id: string) => requests.get(`/api/v1/user/${id}`),
  acceptInstructor: (id: string) =>
    requests.put(`/api/v1/user/instructor/accept/${id}`, {}),
  rejectInstructor: (id: string, reasons: string) =>
    requests.put(`/api/v1/user/instructor/reject/${id}`, {
      reasons: reasons,
    }),
};
const Categories = {
  getAllCategories: () => requests.get("/api/v1/category/"),
};
const Role = {
  checkRole: (id: string) => requests.get(`api/v1/role/get-role/${id}`),
};
const Course = {
  createCourse: (data: any) => requests.post("/api/v1/course", { data }),
  getAllCourse: (input: PaginationParams) =>
    requests.post("/api/v1/course/get-all", {
      page: input.page,
      limit: input.limit,
      search: input.search,
    }),
  getCoursesCount: () => requests.get("/api/v1/course/getCoursesCount"),
};
const Order = {
  getAllOrder: (input: PaginationParams) =>
    requests.post("/api/v1/order/get-all", {
      page: input.page,
      limit: input.limit,
      search: input.search,
    }),
};
const Result = {
  getAllResult: (input: PaginationParamsWithId) =>
    requests.post("/api/v1/result/get-all", {
      page: input.page,
      limit: input.limit,
      search: input.search,
      instructorId: input.instructorId,
    }),
  replyResult: (input: replyParams) =>
    requests.put("/api/v1/result/reply", {
      instructorId: input.instructorId,
      resultId: input.resultId,
      replyMessage: input.replyMessage,
    }),
};
const Payment = {
  createCoursePaymentUrl: (id: string) =>
    requests.get(`/api/v1/payment/getPaymentUrl/${id}`),
  getReturnPaymentUrl: (id: string, queryString: string) =>
    requests.post(`/api/v1/payment/returnUrl/${id}`, {
      vnp_Params: queryString,
    }),
};
const agent = {
  User,
  Role,
  Categories,
  Course,
  Order,
  Result,
  Payment,
};
export default agent;
