import { EvilIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";
import { TextInput } from "react-native";
import { Box, Text } from "react-native-design-utility";

const InputText = ({
  formikProps,
  formikKey,
  color,
  leadingIcon,
  trailingIcon,
  title,
  ...rest
}) => {
  return (
    <Box mb="xs" w="100%" h={title ? 60 : 50}>
      <Box
        f={1}
        dir="row"
        align="center"
        style={{ borderBottomWidth: 1, borderBottomColor: color }}
      >
        {leadingIcon && (
          <Box w={40} h={40} center>
            {/* <AntDesign name={leadingIcon} size={32} color={color}></AntDesign> */}
            {leadingIcon()}
          </Box>
        )}

        <Box f={1}>
          {title && (
            <Box>
              <Text size="xs" color="grey">
                {title}
              </Text>
            </Box>
          )}
          <TextInput
            style={{
              paddingVertical: 6,
              color: color || "grey",
              fontSize: 16
            }}
            onChangeText={formikProps.handleChange(formikKey)}
            onBlur={formikProps.handleBlur(formikKey)}
            {...rest}
          ></TextInput>
        </Box>
        {trailingIcon && (
          <Box w={40} h={40} center>
            <EvilIcons name={trailingIcon} size={25}></EvilIcons>
          </Box>
        )}
      </Box>
      <Box>
        <Text color="red" size="xs">
          {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
        </Text>
      </Box>
    </Box>
  );
};

InputText.propTypes = {
  formikKey: PropTypes.string.isRequired,
  formikProps: PropTypes.object.isRequired,
  color: PropTypes.string,
  leadingIcon: PropTypes.func,
  trailingIcon: PropTypes.string
};

export default InputText;
