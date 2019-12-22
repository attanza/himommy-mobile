import React, { Component } from "react";
import { Box, Text } from "react-native-design-utility";
import { SvgXml } from "react-native-svg";
import { splashBg } from "../utils/svgs";
import checkUserRole from "../helpers/checkUserRole";
import { getToken, getUser, removeToken } from "../helpers/tokenHelper";
import getAppVersion from "../helpers/getAppVersion";
import { inject, observer } from "mobx-react";
class SplashScreen extends Component {
  state = {
    version: {}
  };

  async componentDidMount() {
    await this.getVersion();
    setTimeout(async () => {
      await this.checkAuth();
    }, 2000);
  }

  checkAuth = async () => {
    const {
      history,
      store: { setUser }
    } = this.props;
    // await removeToken();
    const token = await getToken();
    const user = await getUser();

    if (token != null && user != null) {
      setUser(user);
      await checkUserRole(user, history);
    } else {
      history.push("/auth/login");
    }
  };

  getVersion = async () => {
    try {
      const version = await getAppVersion();
      this.setState({ version });
    } catch (e) {
      catchError(e);
    }
  };

  render() {
    const { version } = this.state;
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
  }
}

export default inject("store")(observer(SplashScreen));
