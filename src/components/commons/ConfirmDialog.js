import React from "react";
import { Box, Text } from "react-native-design-utility";
import Modal from "react-native-modal";
import { SvgXml } from "react-native-svg";
import { babyPop } from "../../utils/svgs";
import { theme } from "../../utils/theme";
import RoundButton from "./RoundButton";

const ConfirmDialog = ({
  showConfirm,
  closeConfirm,
  title,
  subtitle,
  onConfirm,
  okText,
  noText,
  okButtonColor
}) => {
  const _renderModalContent = () => (
    <Box bg="white" self="center" radius="base" p="md">
      <Box center>
        <Box w={200} h={200}>
          <SvgXml xml={babyPop} width="100%" height="100%" />
        </Box>
        {title && (
          <Box mt="xs">
            <Text color="red" size="xl">
              {title}
            </Text>
          </Box>
        )}
        {subtitle && (
          <Box py="sm">
            <Text center size="sm">
              {subtitle}
            </Text>
          </Box>
        )}
        <RoundButton
          text={okText || "Simpan"}
          width={200}
          padding="sm"
          textSize="sm"
          color={okButtonColor || theme.color.purple}
          onPress={onConfirm}
          marginBottom="sm"
        ></RoundButton>
        <RoundButton
          text={noText || "Batal"}
          width={200}
          padding="sm"
          textSize="sm"
          color={theme.color.red}
          onPress={closeConfirm}
        ></RoundButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Modal isVisible={showConfirm}>{_renderModalContent()}</Modal>
    </>
  );
};

// ConfirmDialog.propTypes = {
//   showConfirm: PropTypes.bool.isRequired,
//   closeConfirm: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   message: PropTypes.string
// };

export default ConfirmDialog;
