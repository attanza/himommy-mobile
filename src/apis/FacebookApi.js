import Constants from "expo-constants";
import * as Facebook from "expo-facebook";

const permissions = ["public_profile", "email"];

const loginAsync = async () => {
  try {
    await Facebook.initializeAsync(Constants.manifest.facebookAppId);
    const {
      type,
      token
    } = await Facebook.logInWithReadPermissionsAsync(
      Constants.manifest.facebookAppId,
      { permissions, behavior: "web" }
    );
    if (type === "success") {
      return token;
    } else {
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};

export const FacebookApi = {
  loginAsync
};
