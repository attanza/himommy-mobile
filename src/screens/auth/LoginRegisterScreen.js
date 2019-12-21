import React, { useState, useEffect } from "react";
import { Box, Text } from "react-native-design-utility";
import SvgText from "../../components/commons/SvgText";
import { images } from "../../utils/images";
import { artikelTips, info } from "../../utils/svgs";
import { Image, ImageBackground } from "react-native";

import RoundButton from "../../components/commons/RoundButton";

const LoginRegisterScreen = ({ history }) => {
  useEffect(() => {}, []);
  return (
    <Box f={1}>
      <ImageBackground
        source={images.loginRegisterBg}
        style={{ width: "100%", height: "100%" }}
      >
        <Box f={1} dir="row" px="sm">
          <Box f={0.4} justify="end">
            <Image source={images.pregnant1}></Image>
          </Box>
          <Box f={0.6} justify="end">
            <Image source={images.hiMommyPink}></Image>
            <Box mt="sm">
              <Text>
                Berikan yang terbaik untuk si Baby pada hari ini sampai dengan
                dimana Baby dapat melihat dunia bersama Mommy tercinta.
              </Text>
            </Box>
          </Box>
        </Box>
        <Box f={1}>
          <Box f={0.8} px="md" py="xl" align="center" justify="start" dir="row">
            <Box mr="sm">
              <SvgText
                text="Artikel & Tips"
                xml={artikelTips}
                size={50}
                onPress={() => {}}
              ></SvgText>
            </Box>
            <SvgText
              text="Info Kehamilan"
              xml={info}
              size={50}
              onPress={() => {}}
            ></SvgText>
          </Box>
          <Box f={0.2} dir="row" justify="between" mb="md">
            <RoundButton
              text="LOGIN"
              color="red"
              padding="sm"
              onPress={() => history.push("/auth/login")}
            ></RoundButton>
            <RoundButton
              text="DAFTAR"
              color="purple"
              padding="sm"
              onPress={() => history.push("/register/one")}
            ></RoundButton>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default LoginRegisterScreen;
