import axios, { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

axios.defaults.baseURL = "http://react-ssr-api.herokuapp.com";

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    console.log("Connection Error");
  }

  const { status, data, config, headers } = error.response;

  if (error.response.status === 404) {
    console.log("/notfound");
  }
  if (status === 500) {
    console.log("Server error");
  }
  throw error.response;
});
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, params?: {}) => axios.get(url, params).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};
const User = {
  fetchUser: (): Promise<IUser[]> => requests.get(`/users`),
};
export default {
  User,
};
