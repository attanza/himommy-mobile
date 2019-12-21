import { AsyncStorage, Platform } from "react-native";
import moment from "../utils/Moment";
import AppVersionApi from "../apis/AppVersionApi";

const APP_VERSION = "@himommy/appVersion";
export default async () => {
  try {
    const appVersion = await AsyncStorage.getItem(APP_VERSION);
    if (appVersion == null) {
      return getAppVersionFromApi();
    }

    // Check if it needed to be re-new
    const parsed = JSON.parse(appVersion);
    const now = moment();
    const monthLater = moment(parsed.created_at).add(1, "M");
    if (now > monthLater) {
      return getAppVersionFromApi();
    }
    return parsed;
  } catch (e) {
    console.log("e", e);
  }
};

const getAppVersionFromApi = async () => {
  const response = await AppVersionApi.getFromClient(Platform.OS);
  AsyncStorage.setItem(APP_VERSION, JSON.stringify(response.data));
  return response.data;
};
