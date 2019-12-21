import Constants from "expo-constants";
import * as Google from "expo-google-app-auth";

const scopes = ["profile", "email"];

const loginAsync = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: Constants.manifest.extra.googleAppId.android,
      androidStandaloneAppClientId:
        Constants.manifest.extra.googleAppId.androidStandaloneAppClientId,
      iosClientId: Constants.manifest.extra.googleAppId.ios,
      scopes
    });

    if (result.type === "success") {
      return Promise.resolve(result.accessToken);
    } else {
      return Promise.resolve("Google Login failed");
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const GoogleApi = { loginAsync };
