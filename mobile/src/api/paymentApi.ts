import axiosClient from "./apiJWT";

class PaymentApi {
  HandlePaymentApi = async (
    url: string,
    data?: any,
    method?: "get" | "post" | "put" | "delete"
  ) => {
    return await axiosClient(`/api/v1/payment/${url}`, {
      method: method ?? "get",
      data,
    });
  };
}
const paymentApi = new PaymentApi();
export default paymentApi;