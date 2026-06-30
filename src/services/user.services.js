import axios from "axios";
//custom axios
import apiClient from "./apiClient.js";

const getUser = (config = {}) => {
  return apiClient.get(`/users/`, config);
};

const createAccount = (data) => {
  return apiClient.post(`/users/register`, data);
};

const logIn = (data) => {
  return apiClient.post(`/users/login`, data);
};

const verifyOtp = (data) => {
  return apiClient.post(`/users/verify-otp`, data);
};

const resendOtp = () => {
  return apiClient.get(`/users/resend-otp`);
};

const sendOTP = () => {
  return apiClient.get(`/users/verify-email`);
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
