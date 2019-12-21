import React from "react";
import { ActivityIndicator } from "react-native";
import { Box } from "react-native-design-utility";
import { theme } from "../../utils/theme";
const Loader2 = () => {
  return (
    <Box f={1} center>
      <ActivityIndicator
        size="large"
        animating
        color={theme.color.red}
      ></ActivityIndicator>
    </Box>
  );
};

export default Loader2;
