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

const logIn = (data) => {
  return axios.post(`${DEFAULT_URL}/api/v1/users/login`, data, {
    withCredentials: true,
  });
};

const verifyOtp = (data) => {
  return axios.post(`${DEFAULT_URL}/api/v1/users/verify-otp`, data, {
    withCredentials: true,
  });
};

const resendOtp = () => {
  return axios.get(`${DEFAULT_URL}/api/v1/users/resend-otp`, {
    withCredentials: true,
  });
};

const sendOTP = () => {
  return axios.get(`${DEFAULT_URL}/api/v1/users/verify-email`, {
    withCredentials: true,
  });
};
export { getUser, createAccount, logIn, verifyOtp, resendOtp, sendOTP };
