import { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { showMessage } from "react-native-flash-message";

const useBackButton = () => {
  const [counter, setCounter] = useState(0);
  const handler = () => {
    if (counter > 0) {
      BackHandler.exitApp();
    } else {
      setTimeout(() => {
        setCounter(0);
      }, 3000);
      setCounter(counter + 1);
      showMessage({
        message: "Tekan tombol back 2 kali untuk keluar dari aplikasi",
        type: "info"
      });
      return true;
    }
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handler);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handler);
    };
  }, [handler]);
};

export default useBackButton;
