import axiosClient from "./apiJWT";

class ProgressAPI {
  HandleProgress = async (
    url: string,
    data?: any,
    method?: "get" | "post" | "put" | "delete"
  ) => {
    return await axiosClient(`/api/v1/progress${url}`, {
      method: method ?? "get",
      data,
    });
  };
}

const progressAPI = new ProgressAPI();
export default progressAPI;
