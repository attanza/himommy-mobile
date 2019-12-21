import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";
import { Box, Text } from "react-native-design-utility";
import { theme } from "../../utils/theme";
const Badge = ({ icon, color, label }) => {
  return (
    <Box center position="relative" w={60} h={40}>
      <FontAwesome name={icon} size={32} color={color}></FontAwesome>
      <Box position="absolute" bottom={15} right={2}>
        <Box circle={25} center bg={theme.color.purple}>
          <Text size="sm" color="white" weight="bold">
            {label}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

Badge.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default Badge;
