import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Box, Text } from "react-native-design-utility";
import Modal from "react-native-modal";
import { theme } from "../../utils/theme";
import RoundButton from "../commons/RoundButton";
import PropTypes from "prop-types";

const ModalSelect = ({
  items,
  onSelected,
  title,
  value,
  closeText,
  trailingIcon
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const selectItem = val => {
    onSelected(val);
    setIsVisible(false);
  };

  const clearValue = () => {
    onSelected("");
  };
  _renderModalContent = () => {
    return (
      <Box bg="white" self="center" radius="base" p="md" w="100%">
        <Box center>
          <Box borders={0} w="100%" p="xs" style={styles.borderBottom}>
            <Text center>{title}</Text>
          </Box>
          <Box my="sm">
            <ScrollView
              style={{ maxHeight: 300 }}
              showsVerticalScrollIndicator={false}
            >
              {items.map((item, index) => (
                <Box key={index} my="xs">
                  <TouchableOpacity onPress={() => selectItem(item.value)}>
                    <Text>{item.text}</Text>
                  </TouchableOpacity>
                </Box>
              ))}
            </ScrollView>
          </Box>
          <RoundButton
            text={closeText || "Tutup"}
            width={250}
            padding="sm"
            textSize="sm"
            color={theme.color.purple}
            onPress={() => setIsVisible(false)}
            marginBottom="xs"
          ></RoundButton>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box mb="xs" w="100%" mt="sm" boders={0} style={styles.borderBottom}>
        <Box>
          <Text size="xs" color="grey">
            {title}
          </Text>
        </Box>
        <Box dir="row" align="center">
          <Box f={1}>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Text>{value}</Text>
            </TouchableOpacity>
            <Modal
              isVisible={isVisible}
              onBackdropPress={() => setIsVisible(false)}
            >
              {_renderModalContent()}
            </Modal>
          </Box>
          {value != "" && (
            <Box w={40} h={40} center>
              <TouchableOpacity onPress={clearValue}>
                <MaterialIcons
                  name="clear"
                  size={32}
                  color="#9e9e9e"
                ></MaterialIcons>
              </TouchableOpacity>
            </Box>
          )}
          {trailingIcon && (
            <Box w={40} h={40} center>
              {trailingIcon()}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#9A61AD"
  }
});

ModalSelect.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onSelected: PropTypes.func.isRequired,
  closeText: PropTypes.string
};

export default ModalSelect;
