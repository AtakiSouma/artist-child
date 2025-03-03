import axiosClient from "./apiJWT";

class OrderAPI {
  HandleOrderApi = async (
    url: string,
    data?: any,
    method?: "get" | "post" | "put" | "delete"
  ) => {
    return await axiosClient(`/api/v1/order${url}`, {
      method: method ?? "get",
      data,
    });
  };
}
const orderApi = new OrderAPI();
export default orderApi;
