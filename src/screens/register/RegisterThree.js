import React from "react";
import { ImageBackground } from "react-native";
import { Box } from "react-native-design-utility";
import { SvgXml } from "react-native-svg";
import Appbar from "../../components/commons/Appbar";
import CustomKeyboardAvoidingView from "../../components/commons/CustomKeyboardAvoidingView";
import RegisterThreeForm from "../../components/register/RegisterThreeForm";
import { images } from "../../utils/images";
import { hiMommyPurple } from "../../utils/svgs";

const RegisterThree = () => {
  return (
    <ImageBackground
      source={images.vector1}
      style={{ width: "100%", height: "100%" }}
    >
      <Appbar title="PENDAFTARAN" link="/register/two"></Appbar>

      <CustomKeyboardAvoidingView>
        <Box f={1} center>
          <Box h="60%" w="60%" f={1}>
            <SvgXml xml={hiMommyPurple} width="100%" height="100%" />
          </Box>
        </Box>
        <Box f={2} px="xl">
          <RegisterThreeForm></RegisterThreeForm>
        </Box>
      </CustomKeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterThree;
