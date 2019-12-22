import { removeToken } from "./tokenHelper";
import { showMessage } from "react-native-flash-message";

const catchError = async (error, store) => {
  const { showLoader } = store;
  const status =
    error.response && error.response.status ? error.response.status : null;
  let message = "Unknown error, please contact administrator";
  if (status) {
    if (status === 401) {
      removeToken();
    }

    message = error.response.data.meta.message;
  }

  showMessage({
    message,
    type: "danger"
  });
  showLoader(false);
};

export default catchError;
