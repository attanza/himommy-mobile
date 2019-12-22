import { inject, observer } from "mobx-react";
import React from "react";
import { ActivityIndicator } from "react-native";
import { Box, Text } from "react-native-design-utility";
import Modal from "react-native-modal";
import { SvgXml } from "react-native-svg";
import { babyPop } from "../../utils/svgs";
import { theme } from "../../utils/theme";

const Loader = ({ store: { loader } }) => {
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
      <Modal isVisible={loader} useNativeDriver={true}>
        {_renderModalContent()}
      </Modal>
    </>
  );
};

export default inject("store")(observer(Loader));
