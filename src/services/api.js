import axios from "axios";

const api = axios.create({
  baseURL: "https://api.exchangerate.host",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default api;
