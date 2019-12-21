import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { SvgXml } from "react-native-svg";
import { useHistory } from "react-router-dom";

const SvgText = ({ xml, text, to, size }) => {
  const history = useHistory();
  const handlePress = () => {
    if (to && to != "") {
      history.push(to);
    }
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Box w={size * 1.4} center>
        <Box w={size} h={size}>
          <SvgXml xml={xml} width="100%" height="100%" />
        </Box>
        <Box mt="sm">
          <Text size="xs" center>
            {text}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

SvgText.propTypes = {
  xml: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  to: PropTypes.string
};

export default SvgText;
