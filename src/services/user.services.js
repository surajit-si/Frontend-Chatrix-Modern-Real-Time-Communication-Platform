import axios from "axios";
import { DEFAULT_URL } from "../constants.js";
import apiClient from "./apiClient.js";
//custom axios

const getUser = () => {
  return axios.get(`/api/v1/users/`);
};

const createAccount = (data) => {
  return axios.post(`/api/v1/users/register`, data);
};

const logIn = (data) => {
  return axios.post(`/api/v1/users/login`, data);
};

const verifyOtp = (data) => {
  return axios.post(`/api/v1/users/verify-otp`, data);
};

const resendOtp = () => {
  return axios.get(`/api/v1/users/resend-otp`);
};

const sendOTP = () => {
  return axios.get(`/api/v1/users/verify-email`);
};

const createConversation = (data) => {
  return apiClient.post(`/users/create-conversation`, data);
};

export {
  getUser,
  createAccount,
  logIn,
  verifyOtp,
  resendOtp,
  sendOTP,
  createConversation,
};
