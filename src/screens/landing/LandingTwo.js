import React from "react";
import { Image } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { images } from "../../utils/images";

const LandingTwo = props => {
  return (
    <Box f={1}>
      <Box f={1} center>
        <Image source={images.landingTwo}></Image>
        <Box mt="lg">
          <Text color="red" size="xl">
            INFO KEHAMILAN
          </Text>
        </Box>
        <Box mt="md" px="lg">
          <Text center>
            Dapatkan Info kehamilan Mums setiap minggunya mulai dari Info
            perkembang janin, Info vitamin untuk janin hingga perubahan yang
            Mums alami
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingTwo;
