import axiosClient from "./apiJWT";

class UserAPI {
  HandleUserApi = async (
    url: string,
    data?: any,
    method?: "get" | "post" | "put" | "delete"
  ) => {
    return await axiosClient(`/api/v1/user${url}`, {
      method: method ?? "get",
      data,
    });
  };
}
const userApi = new UserAPI();
export default userApi;
