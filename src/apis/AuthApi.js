import axios from "axios";
import { API_URL } from "../config";
import initAxios from "../helpers/initAxios";
import { storeToken, storeUser } from "../helpers/tokenHelper";

class AuthApi {
  async login(data) {
    data.provider = "local";
    const response = await axios
      .post(API_URL + "/login", data)
      .then(res => res.data);
    await storeToken(response.data.token, response.data.refreshToken);
    return response.data.token;
  }

  async facebookLogin(token) {
    const response = await axios
      .post(API_URL + "/login", {
        token,
        provider: "facebook"
      })
      .then(res => res.data);
    await storeToken(response.data.token, response.data.refreshToken);
    return response.data.token;
  }

  async googleLogin(token) {
    const response = await axios
      .post(API_URL + "/login", {
        token,
        provider: "google"
      })
      .then(res => res.data);
    await storeToken(response.data.token, response.data.refreshToken);
    return response.data.token;
  }

  async register(data) {
    const response = await axios
      .post(API_URL + "/register", data)
      .then(res => res.data);
    return response;
  }

  async getMe() {
    await initAxios();
    const response = await axios.get("/me").then(res => res.data);
    await storeUser(response.data);
    return response.data;
  }
}

export default new AuthApi();
