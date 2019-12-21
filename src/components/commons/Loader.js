import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Text } from "react-native-design-utility";
import Modal from "react-native-modal";
import { SvgXml } from "react-native-svg";
import { greenCheck } from "../../utils/svgs";
import { theme } from "../../utils/theme";
import RoundButton from "./RoundButton";
import { AuthContext } from "../../contexts/authContext";
import { babyPop } from "../../utils/svgs";
import { ActivityIndicator } from "react-native";

const Loader = () => {
  const { loading, showLoader } = useContext(AuthContext);
  const _renderModalContent = () => (
    <Box bg="white" self="center" radius="base" p="md">
      <Box center>
        <Box w={200} h={200}>
          <SvgXml xml={babyPop} width="100%" height="100%" />
        </Box>
        <Box my="md">
          <Text color={theme.color.red} size="md">
            Memproses ...
          </Text>
        </Box>
        <ActivityIndicator
          size="large"
          color={theme.color.red}
        ></ActivityIndicator>
      </Box>
    </Box>
  );

  return (
    <>
      <Modal isVisible={loading} useNativeDriver={true}>
        {_renderModalContent()}
      </Modal>
    </>
  );
};

export default Loader;
