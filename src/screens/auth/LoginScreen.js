import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { SvgXml } from "react-native-svg";
import AuthApi from "../../apis/AuthApi";
import { FacebookApi } from "../../apis/FacebookApi";
import { GoogleApi } from "../../apis/GoogleApi";
import LoginForm from "../../components/auth/LoginForm";
import Appbar from "../../components/commons/Appbar";
import CustomScrollView from "../../components/commons/CustomScrollView";
import catchError from "../../helpers/catchError";
import { images } from "../../utils/images";
import { facebookBtn, googleBtn, hiMommyPink } from "../../utils/svgs";

class LoginScreen extends Component {
  facebookLogin = async () => {
    try {
      const {
        store: { showLoader, setUser }
      } = this.props;
      const token = await FacebookApi.loginAsync();
      showLoader(true);
      await AuthApi.facebookLogin(token);
      const user = await AuthApi.getMe();
      setUser(user);
      showLoader(false);
      history.push("/user");
    } catch (e) {
      catchError(e, this.props.store);
    }
  };

  googleLogin = async () => {
    try {
      const {
        store: { showLoader, setUser }
      } = this.props;
      const token = await GoogleApi.loginAsync();
      showLoader(true);
      await AuthApi.googleLogin(token);
      const user = await AuthApi.getMe();
      setUser(user);
      showLoader(false);
      history.push("/user");
    } catch (e) {
      catchError(e, this.props.store);
    }
  };

  render() {
    const { history } = this.props;
    return (
      <ImageBackground
        source={images.vector1}
        style={{ width: "100%", height: "100%" }}
      >
        <Appbar title="LOGIN" link="/auth/loginRegister"></Appbar>
        <CustomScrollView>
          <Box f={1}>
            {/* LOGO */}
            <Box f={1} center>
              <Box w={300} h={300} mt="sm">
                <SvgXml xml={hiMommyPink} width="100%" height="100%" />
              </Box>
            </Box>

            {/* FORM */}

            <Box f={1} px="lg">
              <LoginForm></LoginForm>
            </Box>

            {/* BOTOM */}
            <Box f={1} justify="evenly" mt="sm">
              <Box>
                <Text center color="purple">
                  Lupa password ?
                </Text>
              </Box>

              <Box mt="sm">
                <Text center color="grey" size="sm">
                  atau login dengan
                </Text>
              </Box>

              <Box dir="row" center mt="sm">
                <Box mr="sm">
                  <TouchableOpacity onPress={this.facebookLogin}>
                    <Box w={50} h={50} mt="sm">
                      <SvgXml xml={facebookBtn} width="100%" height="100%" />
                    </Box>
                  </TouchableOpacity>
                </Box>
                <Box>
                  <TouchableOpacity onPress={this.googleLogin}>
                    <Box w={50} h={50} mt="sm">
                      <SvgXml xml={googleBtn} width="100%" height="100%" />
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Box>

              <Box dir="row" justify="center" mt="sm">
                <Text>Belum punya akun ?</Text>
                <Box ml="xs">
                  <TouchableOpacity
                    onPress={() => history.push("/register/one")}
                  >
                    <Text color="purple">Daftar sekarang</Text>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>
          </Box>
        </CustomScrollView>
      </ImageBackground>
    );
  }
}

export default inject("store")(observer(LoginScreen));
