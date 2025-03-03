import axios from "axios";


// IP of Nam
const baseURL = "http://192.168.43.159:8888";

const baseApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default baseApi;




