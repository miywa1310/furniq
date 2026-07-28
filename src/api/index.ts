import axios from "axios";

const BASE_URL = "https://furniq-api.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
});
