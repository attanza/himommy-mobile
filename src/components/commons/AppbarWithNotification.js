import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { useHistory } from "react-router-dom";
import { theme } from "../../utils/theme";
import Badge from "../commons/Badge";

const AppbarWithAction = ({ title, link }) => {
  const history = useHistory();

  const handlePress = () => {
    history.push(link);
  };

  return (
    <Box w="100%" h="10%">
      <Box f={1}>
        <Box f={1}></Box>
        <Box f={1} rows={[1, 2, 1]} dir="row" align="center">
          <Box pl="md">
            {link && (
              <TouchableOpacity onPress={handlePress}>
                <FontAwesome name="angle-left" size={40}></FontAwesome>
              </TouchableOpacity>
            )}
          </Box>
          <Box center>
            <Text size="sm">{title}</Text>
          </Box>
          <Box pr="xs" f={1} align="end" pr="md">
            <Badge icon="bell-o" color={theme.color.purple} label="3"></Badge>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

AppbarWithAction.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string
};

export default AppbarWithAction;
