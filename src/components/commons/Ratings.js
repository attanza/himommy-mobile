import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Box } from "react-native-design-utility";
import { theme } from "../../utils/theme";
const Ratings = () => {
  return (
    <Box center dir="row" mt="xs">
      <AntDesign name="star" size={22} color={theme.color.red}></AntDesign>
      <AntDesign name="star" size={22} color={theme.color.red}></AntDesign>
      <AntDesign name="star" size={22} color={theme.color.red}></AntDesign>
      <AntDesign name="staro" size={22} color={theme.color.grey}></AntDesign>
      <AntDesign name="staro" size={22} color={theme.color.grey}></AntDesign>
    </Box>
  );
};

export default Ratings;
