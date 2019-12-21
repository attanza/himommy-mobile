import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Box } from "react-native-design-utility";
import { theme } from "../../../utils/theme";

const Checkbox = ({ checked }) => {
  return (
    <Box>
      {checked ? (
        <Box mr={5}>
          <Ionicons
            name="md-checkbox-outline"
            size={40}
            color={theme.color.purple}
          ></Ionicons>
        </Box>
      ) : (
        <MaterialIcons
          name="check-box-outline-blank"
          size={40}
          color={theme.color.purple}
        ></MaterialIcons>
      )}
    </Box>
  );
};

export default Checkbox;
