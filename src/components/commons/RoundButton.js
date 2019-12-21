import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "react-native-design-utility";

const RoundButton = ({
  text,
  color,
  onPress,
  width,
  padding,
  textSize,
  marginBottom
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        dir="row"
        align="center"
        justify="center"
        bg={color}
        w={width ? width : "80%"}
        self="center"
        p={padding ? padding : "sm"}
        radius="xl"
        mb={marginBottom || "sm"}
      >
        <Text color="white" size={textSize || "base"}>
          {text}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

RoundButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  // width: PropTypes.string,
  padding: PropTypes.string,
  textSize: PropTypes.string
};

export default RoundButton;
