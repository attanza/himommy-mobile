import { AsyncStorage } from "react-native";
import jwtDecode from "jwt-decode";
import moment from "../utils/Moment";
import axios from "axios";
import { API_URL } from "../config";
const TOKEN_KEY = "@himommy/token";
const REFRESH_TOKEN_KEY = "@himommy/refreshToken";
const USER_KEY = "@himommy/user";
const APP_VERSION = "@himommy/appVersion";

export const storeToken = async (token, refreshToken) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  return true;
};

export const getToken = async () => {
  let token = await checkToken();
  return token;
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  await AsyncStorage.removeItem(APP_VERSION);
};

export const storeUser = async user => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  return true;
};

export const getUser = async () => {
  const stringUser = await AsyncStorage.getItem(USER_KEY);
  return JSON.parse(stringUser);
};

const checkToken = async () => {
  let token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token != null) {
    const { exp } = jwtDecode(token);
    const tokenExpiryDate = moment.unix(exp);
    const now = moment();
    if (now > tokenExpiryDate) {
      token = await requestForRefreshToken();
    }
  }
  return token;
};

const requestForRefreshToken = async () => {
  try {
    const refreshToken = await getRefreshToken();
    if (refreshToken != null) {
      const response = await axios
        .post(`${API_URL}/refreshToken`, { refreshToken })
        .then(res => res.data);
      await storeToken(response.data.token, response.data.refreshToken);
      return response.data.token;
    }
  } catch (e) {
    await removeToken();
  }
};
