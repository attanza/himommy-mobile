import PropTypes from "prop-types";
import React from "react";
import { Box, Text } from "react-native-design-utility";
import Modal from "react-native-modal";
import { SvgXml } from "react-native-svg";
import { greenCheck } from "../../utils/svgs";
import { theme } from "../../utils/theme";
import RoundButton from "./RoundButton";

const InfoDialog = ({
  showConfirm,
  closeConfirm,
  title,
  message,
  children
}) => {
  const _renderModalContent = () => (
    <Box bg="white" self="center" radius="base" p="md">
      <Box center>
        <Box w={100} h={100}>
          <SvgXml xml={greenCheck} width="100%" height="100%" />
        </Box>
        <Box mt="xs">
          <Text weight="bold">{title}</Text>
        </Box>
        <Box>
          <Text center size="xs">
            {message}
          </Text>
        </Box>
        <Box my="sm">{children}</Box>
        <RoundButton
          text="Selesai"
          width={250}
          padding="sm"
          textSize="sm"
          color={theme.color.purple}
          onPress={closeConfirm}
          marginBottom="xs"
        ></RoundButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Modal isVisible={showConfirm} useNativeDriver={true}>
        {_renderModalContent()}
      </Modal>
    </>
  );
};

InfoDialog.propTypes = {
  showConfirm: PropTypes.bool.isRequired,
  closeConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string
};

export default InfoDialog;
