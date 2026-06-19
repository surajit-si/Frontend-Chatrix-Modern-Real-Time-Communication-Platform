import axios from "axios";
import { DEFAULT_URL } from "../constants.js";

const getUser = () => {
  return axios.get(`${DEFAULT_URL}/api/v1/users/`, { withCredentials: true });
};

const createAccount = (data) => {
  return axios.post(`${DEFAULT_URL}/api/v1/users/register`, data, {
    withCredentials: true,
  });
};

export { getUser, createAccount };
