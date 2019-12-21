import React, { useContext, useEffect, useState } from "react";
import { Box, Text } from "react-native-design-utility";
import { SvgXml } from "react-native-svg";
import { splashBg } from "../utils/svgs";
import { AuthContext } from "../contexts/authContext";
import checkUserRole from "../helpers/checkUserRole";
import { getToken, getUser, removeToken } from "../helpers/tokenHelper";
import getAppVersion from "../helpers/getAppVersion";

const SplashScreen = ({ history }) => {
  const { setToken, setUser } = useContext(AuthContext);
  const [version, setVersion] = useState("");
  const checkAuth = async () => {
    // await removeToken();
    const token = await getToken();

    const user = await getUser();
    // TODO: request to server if user data not exists

    if (token != null) {
      setToken(token);
      setUser(user);
      await checkUserRole(user, history);
      // history.push("/user/tocologists");
      // props.history.push("/auth/login");
    } else {
      // history.push("/auth/login");
      history.push("/landing");
    }
  };

  const getVersion = async () => {
    const version = await getAppVersion();
    setVersion(version);
  };

  useEffect(() => {
    getVersion();
    setTimeout(() => {
      checkAuth();
    }, 2000);
  }, []);
  return (
    <Box f={1} center>
      <Box w={400} h={400}>
        <SvgXml xml={splashBg} width="100%" height="100%" />
      </Box>
      <Box center mt="lg">
        <Text color="red">Version: {version.version}</Text>
      </Box>
    </Box>
  );
};

export default SplashScreen;
