import axios from "axios";
import { DEFAULT_URL } from "../constants";

//config
const apiClient = axios.create({
  baseURL: DEFAULT_URL,
  withCredentials: true,
});

//in interceptors first is for responce and second is for error.
//setup for auto autherize
apiClient.interceptors.response.use(
  (response) => {
    //if request is successful then return normally
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    //if error is 401 && retry is false
    //it prevent func to infinite loop

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.get(
          `${DEFAULT_URL}/users/refreshTokens`,
          { withCredentials: true },
        );

        //Retry if successful
        if (refreshResponse.status === 200) {
          return apiClient(originalRequest);
        } else {
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.error("refresh token expired, please login again.");
        return Promise.reject(refreshError);
      }
    }

    //For any other error that isn't 401, reject it normally
    return Promise.reject(error);
  },
);

export default apiClient;
