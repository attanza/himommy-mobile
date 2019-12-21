import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";

const CustomKeyboardAvoidingView = ({ children }) => {
  const onPress = () => {
    Keyboard.dismiss(0);
  };
  return (
    <TouchableWithoutFeedback onPress={onPress} accessible={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <>{children}</>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CustomKeyboardAvoidingView;
