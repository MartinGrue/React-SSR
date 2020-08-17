import { AxiosInstance, AxiosResponse } from "axios";
import { IUser, ICurrentUser, IUserRequest } from "../models/IUser";

export interface Agent {
  axiosInstance: AxiosInstance;
  User: {
    fetchUser: () => Promise<IUser[]>;
    fetchCurrentUser: () => Promise<ICurrentUser>;
    signIn: (user: IUserRequest) => Promise<IUser>;
  };
}
export default (axiosInstance: AxiosInstance): Agent => {
  axiosInstance.interceptors.response.use(undefined, (error) => {
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
    get: (url: string, params?: {}) =>
      axiosInstance.get(url, params).then(responseBody),
    post: (url: string, body: {}) =>
      axiosInstance.post(url, body).then(responseBody),
    put: (url: string, body: {}) =>
      axiosInstance.put(url, body).then(responseBody),
    delete: (url: string) => axiosInstance.delete(url).then(responseBody),
  };
  const User = {
    fetchUser: (): Promise<IUser[]> => requests.get(`/users`),
    signIn: (user: IUserRequest): Promise<IUser> =>
      requests.post(`/auth/signin`, user),
    fetchCurrentUser: (): Promise<ICurrentUser> =>
      requests.get("/auth/currentuser"),
  };
  return { axiosInstance, User };
};
