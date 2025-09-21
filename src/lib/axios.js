// src/lib/axios.js or app/lib/axios.js

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
