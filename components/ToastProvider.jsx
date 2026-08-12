"use client";

import { ToastContainer } from "react-toastify";

const ToastProvider = () => {
  return <ToastContainer position="top-center" autoClose={3000} theme="colored" />;
};

export default ToastProvider;
