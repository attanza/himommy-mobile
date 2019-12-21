import React, { useState, useEffect } from "react";
import { Box, Text } from "react-native-design-utility";
import Appbar from "../../components/commons/Appbar";
import { ImageBackground } from "react-native";
import CustomKeyboardAvoidingView from "../../components/commons/CustomKeyboardAvoidingView";
import { hiMommyPurple } from "../../utils/svgs";
import { SvgXml } from "react-native-svg";
import RegisterOneForm from "../../components/register/RegisterOneForm";

import { images } from "../../utils/images";
const RegisterOne = () => {
  useEffect(() => {}, []);
  return (
    <ImageBackground
      source={images.vector1}
      style={{ width: "100%", height: "100%" }}
    >
      <Appbar title="PENDAFTARAN" link="/auth/loginRegister"></Appbar>
      <CustomKeyboardAvoidingView>
        <Box f={1} center>
          <Box h="60%" w="60%" f={1}>
            <SvgXml xml={hiMommyPurple} width="100%" height="100%" />
          </Box>
        </Box>
        <Box f={2} px="xl">
          <RegisterOneForm></RegisterOneForm>
        </Box>
      </CustomKeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterOne;
