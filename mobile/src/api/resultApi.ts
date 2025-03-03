import axiosClient from "./apiJWT";

class ResultAPI {
  HandleResultApi = async (
    url: string,
    data?: any,
    method?: "get" | "post" | "put" | "delete"
  ) => {
    return await axiosClient(`/api/v1/result${url}`, {
      method: method ?? "get",
      data,
    });
  };
}
const resultApi = new ResultAPI();
export default resultApi;
