import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { theme } from "../../utils/theme";
import Checkbox from "../commons/form/Checkbox";
const SelectServices = ({ services, onPress, isChecked }) => {
  return (
    <>
      {services.map(s => (
        <TouchableOpacity onPress={() => onPress(s.id)} key={s.id}>
          <Box
            dir="row"
            rows={[5, 1]}
            align="center"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme.color.purple
            }}
          >
            <Box>
              <Text>{s.service.name}</Text>
            </Box>
            <Box align="end">
              <Checkbox checked={isChecked(s.id)}></Checkbox>
            </Box>
          </Box>
        </TouchableOpacity>
      ))}
    </>
  );
};

SelectServices.propTypes = {
  services: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  isChecked: PropTypes.func.isRequired
};

export default SelectServices;
