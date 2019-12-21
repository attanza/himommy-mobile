import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { useHistory } from "react-router-dom";

const Appbar = ({ title, link }) => {
  const history = useHistory();
  const handlePress = () => {
    history.push(link);
  };
  return (
    <Box w="100%" h={80}>
      <Box f={1} dir="row" justify="center" align="end" pb="2xs">
        <Text>{title}</Text>
      </Box>
      {link && (
        <Box position="absolute" bottom={0} left={30}>
          <TouchableOpacity onPress={handlePress}>
            <FontAwesome name="angle-left" size={40}></FontAwesome>
          </TouchableOpacity>
        </Box>
      )}
    </Box>
  );
};

Appbar.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string
};

export default Appbar;
