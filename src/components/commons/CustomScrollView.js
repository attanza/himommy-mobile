import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CustomScrollView = ({ children, ...rest }) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraHeight={130}
      extraScrollHeight={130}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default CustomScrollView;
