import { Envs } from "./env";
import axios from 'axios';

const baseURL = Envs.apiLocal;

const baseApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default baseApi;
