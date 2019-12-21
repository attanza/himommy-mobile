import axios from "axios";
import { API_URL } from "../config";
import { getToken } from "./tokenHelper";

export default async () => {
  axios.defaults.baseURL = API_URL;
  const token = await getToken();
  if (token != null) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};
