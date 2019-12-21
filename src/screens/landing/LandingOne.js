import React from "react";
import { Image } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { images } from "../../utils/images";

const LandingOne = props => {
  return (
    <>
      <Box f={1} center>
        <Image source={images.landingOne}></Image>
        <Box mt="lg">
          <Text color="red" size="xl">
            AGAR MOMMY SELALU INGAT
          </Text>
        </Box>
        <Box mt="md" px="lg">
          <Text center>
            Yuk cek apa aja yang harus Mums perhatikan di setiap minggu
            kehamilan untuk kesehatan si Baby
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default LandingOne;
