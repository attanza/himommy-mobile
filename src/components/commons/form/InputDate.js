import DateTimePicker from "@react-native-community/datetimepicker";
import React, { Component } from "react";
import { Platform, TouchableOpacity, Button } from "react-native";
import { Box, Text } from "react-native-design-utility";
import moment from "../../../utils/Moment";
import Modal from "react-native-modal";

export default class InputDate extends Component {
  state = {
    show: false
  };

  setDate = (event, date) => {
    const { formikProps, formikKey } = this.props;
    date = date || formikProps.values[formikKey];
    formikProps.setFieldValue(formikKey, date);
    this.setState({
      show: Platform.OS === "ios" ? true : false
    });
  };

  _show = () => {
    this.setState({
      show: true
    });
  };

  _close = () => {
    this.setState({
      show: false
    });
  };

  iosDate = () => {
    const { show } = this.state;
    const { formikProps, formikKey, mode } = this.props;

    return (
      <Modal isVisible={show}>
        <Box bg="white" self="center" radius="base" p="md" w="100%">
          <DateTimePicker
            value={moment(formikProps.values[formikKey]).toDate()}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={this.setDate}
          />
          <Box>
            <Button title="Confirm" onPress={this._close}></Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  androidDate = () => {
    const { show } = this.state;
    const { formikProps, formikKey, mode } = this.props;
    if (show) {
      return (
        <DateTimePicker
          value={moment(formikProps.values[formikKey]).toDate()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={this.setDate}
        />
      );
    }
    return null;
  };

  render() {
    const {
      title,
      formikProps,
      formikKey,
      color,
      leadingIcon,
      trailingIcon
    } = this.props;

    return (
      <Box mb="xs" w="100%" h={title ? 60 : 50}>
        <Box
          f={1}
          dir="row"
          align="center"
          style={{ borderBottomWidth: 1, borderBottomColor: color }}
        >
          {leadingIcon && (
            <Box w={40} h={40} center>
              {leadingIcon()}
            </Box>
          )}

          <Box f={1}>
            {title && (
              <Box>
                <Text size="xs" color="grey">
                  {title}
                </Text>
              </Box>
            )}
            <Box>
              <TouchableOpacity onPress={this._show}>
                <Text color={color}>
                  {moment(formikProps.values[formikKey]).format("D MMM YYYY")}
                </Text>
              </TouchableOpacity>
              {Platform.OS === "android" ? this.androidDate() : this.iosDate()}
            </Box>
          </Box>
          {trailingIcon && (
            <Box w={40} h={40} center>
              <EvilIcons name={trailingIcon} size={25}></EvilIcons>
            </Box>
          )}
        </Box>
        <Box>
          <Text color="red" size="xs">
            {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
          </Text>
        </Box>
      </Box>
    );
  }
}
