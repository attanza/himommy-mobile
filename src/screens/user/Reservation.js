import React, { useContext, useState } from "react";
import { Image } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { showMessage } from "react-native-flash-message";
import { useParams } from "react-router-dom";
import ReservationApi from "../../apis/ReservationApi";
import Appbar from "../../components/commons/Appbar";
import InfoDialog from "../../components/commons/InfoDialog";
import Ratings from "../../components/commons/Ratings";
import RoundButton from "../../components/commons/RoundButton";
import SimpleTable from "../../components/commons/SimpleTable";
import ReservationDate from "../../components/user/ReservationDate";
import SelectServices from "../../components/user/SelectServices";
import { AuthContext, TocologistContext } from "../../contexts";
import catchError from "../../helpers/catchError";
import moment from "../../utils/Moment";
import { theme } from "../../utils/theme";

const Reservation = props => {
  const { tocologist } = useContext(TocologistContext);
  const { showLoader } = useContext(AuthContext);
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const [reservationSummary, setReservationSummary] = useState({});
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const backLink = `/user/tocologists/${id}`;

  const handlePress = id => {
    const index = services.findIndex(s => s === id);

    let updatedServices = [...services];

    if (index === -1) {
      updatedServices.push(id);
      setServices(updatedServices);
    } else {
      updatedServices.splice(index, 1);
      setServices(updatedServices);
    }
  };

  const submit = async () => {
    if (services.length === 0) {
      return showMessage({
        message: "Pilih pelayanan terlebih dahulu",
        type: "warning"
      });
    }

    if (reservationDate === "") {
      return showMessage({
        message: "Pilih Tanggal terlebih dahulu",
        type: "warning"
      });
    }

    if (reservationTime === "") {
      return showMessage({
        message: "Pilih Waktu terlebih dahulu",
        type: "warning"
      });
    }

    try {
      const summary = {
        "Nama Bidan": tocologist.name,
        Tanggal: moment(reservationDate).format("DD MMMM YYYY"),
        Jam: reservationTime
      };
      setReservationSummary(summary);
      const postData = {
        tocologist_id: tocologist.id,
        date: moment(`${reservationDate} ${reservationTime}`).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        services
      };
      showLoader(true);
      const response = await ReservationApi.store(postData);
      summary["Kode Reservasi"] = response.data.code;
      showLoader(false);
      setTimeout(() => {
        setShowConfirm(true);
      }, 500);
    } catch (e) {
      console.log("e", e);
      const message = await catchError(e);
      showLoader(false);

      showMessage({
        message,
        type: "danger"
      });
    }
  };

  const isChecked = id => {
    const index = services.findIndex(s => s === id);
    if (index === -1) return false;
    return true;
  };

  const closeConfirm = () => {
    if (showConfirm) setShowConfirm(false);
    setTimeout(() => {
      props.history.push("/user/tocologists");
    }, 500);
  };

  const getDateValue = val => {
    setReservationDate(val);
  };

  const getTimeValue = val => {
    setReservationTime(val);
  };

  return (
    <>
      <InfoDialog
        showConfirm={showConfirm}
        closeConfirm={closeConfirm}
        title="Reservasi Selesai"
        message="Reservasi anda telah berhasil disimpan"
      >
        <Box shadow={0} bg="white" w="95%" p="xs" radius="sm">
          <SimpleTable data={reservationSummary}></SimpleTable>
        </Box>
      </InfoDialog>
      <Appbar title="RESERVASI" link={backLink}></Appbar>
      <Box f={0.8}>
        <Box px="md" mt="md">
          <Box dir="row" rows={[1, 3]}>
            <Box avatar circle={100}>
              <Image source={{ uri: tocologist.avatar }}></Image>
            </Box>
            <Box pl="md" justify="end" align="start">
              <Box>
                <Text weight="bold">{tocologist.name}</Text>
              </Box>
              <Ratings></Ratings>
            </Box>
          </Box>

          <Box mt="lg">
            <Text weight="bold">PILIH JASA BIDAN</Text>
          </Box>
          <Box mt="sm">
            <SelectServices
              services={tocologist.services}
              onPress={handlePress}
              isChecked={isChecked}
            ></SelectServices>
          </Box>
          <Box mt="lg">
            <Text weight="bold">JADWAL</Text>
          </Box>
          <Box>
            <ReservationDate
              getDateValue={getDateValue}
              getTimeValue={getTimeValue}
            ></ReservationDate>
          </Box>
        </Box>
      </Box>
      <Box f={0.2}>
        <RoundButton
          onPress={submit}
          text="Selesai"
          color={theme.color.purple}
        ></RoundButton>
        <RoundButton
          onPress={() => props.history.push(backLink)}
          text="Batal"
          color={theme.color.red}
        ></RoundButton>
      </Box>
    </>
  );
};

export default Reservation;
