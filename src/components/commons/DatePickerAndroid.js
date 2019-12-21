import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { View } from "react-native";

const DatePickerAndroid = ({ show, value, mode, onDateChange }) => {
  return (
    <View>
      {show && (
        <DateTimePicker
          value={value}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default DatePickerAndroid;
