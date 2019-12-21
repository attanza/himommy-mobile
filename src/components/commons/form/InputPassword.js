import { AntDesign, FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Box, Text } from "react-native-design-utility";
const InputPassword = ({ formikProps, formikKey, color, icon, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box mb="xs" w="100%" h={50}>
      <Box
        f={1}
        dir="row"
        align="center"
        style={{ borderBottomWidth: 1, borderBottomColor: color }}
      >
        <Box w={40} h={40} center>
          <AntDesign name="lock1" size={32} color={color}></AntDesign>
        </Box>
        <Box f={1}>
          <TextInput
            style={{
              paddingVertical: 8,
              color: color || "grey",
              fontSize: 16,
              paddingLeft: 10
            }}
            secureTextEntry={!showPassword}
            onChangeText={formikProps.handleChange(formikKey)}
            onBlur={formikProps.handleBlur(formikKey)}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            {...rest}
          ></TextInput>
        </Box>
        <Box w={40} h={40} center>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={28}
              color={color}
            ></FontAwesome>
          </TouchableOpacity>
        </Box>
      </Box>
      <Box>
        <Text color="red" size="xs">
          {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
        </Text>
      </Box>
    </Box>
  );
};

InputPassword.propTypes = {
  formikKey: PropTypes.string.isRequired,
  formikProps: PropTypes.object.isRequired,
  color: PropTypes.string,
  icon: PropTypes.string
};

export default InputPassword;
