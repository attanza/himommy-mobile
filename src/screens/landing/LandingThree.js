import React from "react";
import { Image } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { useHistory } from "react-router-dom";
import RoundButton from "../../components/commons/RoundButton";
import { images } from "../../utils/images";
const LandingThree = () => {
  const history = useHistory();
  return (
    <Box f={1} pt={60}>
      <Box f={0.8} center>
        <Image source={images.landingThree}></Image>
        <Box mt="lg">
          <Text color="red" size="xl">
            ARTIKEL & TIPS
          </Text>
        </Box>
        <Box mt="sm" px="lg">
          <Text center size="sm">
            Dapatkan Info kehamilan Mums setiap minggunya mulai dari Info
            perkembang janin, Info vitamin untuk janin hingga perubahan yang
            Mums alami
          </Text>
        </Box>
      </Box>
      <Box f={0.1} pt="md">
        <RoundButton
          text="MULAI"
          color="purple"
          width="80%"
          onPress={() => history.push("/auth/loginRegister")}
        ></RoundButton>
      </Box>
    </Box>
  );
};

export default LandingThree;
