import { MaterialIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Box } from "react-native-design-utility";
import moment from "../../utils/Moment";
import { theme } from "../../utils/theme";
import ModalSelect from "../commons/ModalSelect";

const MAX_DATE = 6;
const MIN_TIME = 8;
const MAX_TIME = 20;

const getDates = () => {
  let dates = [];
  const nowHour = moment().hour();
  if (nowHour < MAX_TIME) {
    dates.push({
      value: moment(),
      text: moment().format("dddd, DD MMMM")
    });
  }

  for (let i = 1; i < MAX_DATE; i++) {
    const date = moment().add(i, "d");
    dates.push({
      value: date,
      text: date.format("dddd, DD MMMM")
    });
  }
  return dates;
};

const getTimes = reservationDate => {
  let times = [];
  const now = moment().format("YYYY-MM-DD");
  const currentReservationDate = moment(reservationDate).format("YYYY-MM-DD");
  if (now == currentReservationDate) {
    const currentHour = moment().hour();
    for (let i = currentHour + 1; i <= MAX_TIME; i++) {
      let time = i < 10 ? `0${i}:00` : `${i}:00`;
      times.push({
        value: time,
        text: time
      });
    }
  } else {
    for (let i = MIN_TIME; i < MAX_TIME; i++) {
      let time = i < 10 ? `0${i}:00` : `${i}:00`;
      times.push({
        value: time,
        text: time
      });
    }
  }
  return times;
};

const dateTrailingIcon = () => (
  <MaterialIcons
    name="date-range"
    size={32}
    color={theme.color.purple}
  ></MaterialIcons>
);

const timeTrailingIcon = () => (
  <MaterialIcons
    name="update"
    size={32}
    color={theme.color.purple}
  ></MaterialIcons>
);

const ReservationDate = ({ getDateValue, getTimeValue }) => {
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [times, setTimes] = useState([]);

  const setDate = val => {
    setReservationDate(val);
    if (val != "") getDateValue(val.format("YYYY-MM-DD"));
  };
  const setTime = val => {
    setReservationTime(val);
    getTimeValue(val);
  };

  useEffect(() => {
    setTimes(getTimes(reservationDate));
  }, [reservationDate]);

  return (
    <Box w="100%">
      <ModalSelect
        items={getDates()}
        onSelected={val => setDate(val)}
        title="Pilih Tanggal"
        value={
          reservationDate !== "" ? reservationDate.format("dddd, DD MMMM") : ""
        }
        trailingIcon={dateTrailingIcon}
      ></ModalSelect>
      <ModalSelect
        items={times}
        onSelected={val => setTime(val)}
        title="Pilih Waktu"
        value={reservationTime}
        trailingIcon={timeTrailingIcon}
      ></ModalSelect>
    </Box>
  );
};

ReservationDate.propTypes = {
  getDateValue: PropTypes.func.isRequired,
  getTimeValue: PropTypes.func.isRequired
};
export default ReservationDate;
