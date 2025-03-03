import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";
import baseApi from "./baseApi";
import { useNavigation } from "@react-navigation/native";
import queryString from 'query-string';

 const baseURL = "http://192.168.43.159:8888";
// const baseURL = "http://192.168.1.9:8888"
const axiosClient = axios.create({
  baseURL:baseURL,
  paramsSerializer: params => queryString.stringify(params),
});
const getAccessToken = async () => {
  const res = await AsyncStorage.getItem('auth');
  return res ? JSON.parse(res).accesstoken : '';
};

axiosClient.interceptors.request.use(async (config: any) => {
  const access_token = await getAccessToken();

  config.headers = {
    Authorization: access_token ? `Bearer ${access_token}` : '',
    Accept: 'application/json',
    ...config.headers,
  };

  config.data;
  return config;
});
axiosClient.interceptors.response.use(
  res => {
    if (res.data && res.status === 200) {
      return res.data;
    }
    throw new Error('Error');
  },
  error => {
    console.log(`Error api ${JSON.stringify(error)}`);
    throw new Error(error.response);
  },
);
export default axiosClient;
