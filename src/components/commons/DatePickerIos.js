import DateTimePicker from "@react-native-community/datetimepicker";
import PropTypes from "prop-types";
import React from "react";
import { Button, Platform } from "react-native";
import { Box, Text } from "react-native-design-utility";
import Modal from "react-native-modal";

const DatePicker = ({
  show,
  close,
  confirm,
  onDateChange,
  value,
  title,
  confirmText,
  closeText,
  mode,
  minimumDate,
  maximumDate
}) => {
  const _dateDialog = () => (
    <Box bg="white" w="100%">
      <DateTimePicker
        value={value}
        mode={mode || "date"}
        is24Hour={true}
        display="default"
        onChange={onDateChange}
        minimumDate={minimumDate || null}
        maximumDate={maximumDate || null}
      />
    </Box>
  );

  const _modalContent = () => (
    <Box bg="white" self="center" radius="base" p="md" w="100%">
      <Box center>
        <Box
          my="sm"
          w="100%"
          pb="sm"
          style={{ borderBottomWidth: 1, borderBottomColor: "grey" }}
        >
          <Text center size="md">
            {title || "Pick a date"}
          </Text>
        </Box>
        {_dateDialog()}
        <Box dir="row" justify="evenly" w="100%">
          <Button title={closeText || "Close"} onPress={close}></Button>
          <Button title={confirmText || "Confirm"} onPress={confirm}></Button>
        </Box>
      </Box>
    </Box>
  );
  return (
    <Modal isVisible={show} useNativeDriver={true} onBackdropPress={close}>
      {_modalContent()}
    </Modal>
  );
};

DatePicker.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  maximumDate: PropTypes.instanceOf(Date),
  minimumDate: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string,
  confirmText: PropTypes.string,
  closeText: PropTypes.string,
  mode: PropTypes.string
};

export default DatePicker;
