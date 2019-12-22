import { Formik } from "formik";
import React, { useContext } from "react";
import { Box } from "react-native-design-utility";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import RoundButton from "../../components/commons/RoundButton";
import { RegisterContext } from "../../contexts/registerContext";
import { theme } from "../../utils/theme";
import InputText from "../commons/form/InputText";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { inject, observer } from "mobx-react";

const validationSchema = yup.object().shape({
  phone: yup
    .string()
    .max(30, "Nomor handphone tidak boleh lebih dari 30 karakter")
    .required("Nomor handphone diperlukan"),
  email: yup
    .string()
    .email("Email harus alamat email valid")
    .required("Email diperlukan")
});

const phoneIcon = () => (
  <FontAwesome
    name="mobile-phone"
    size={32}
    color={theme.color.purple}
  ></FontAwesome>
);

const mailIcon = () => (
  <AntDesign name="mail" size={32} color={theme.color.purple}></AntDesign>
);

const RegisterTwoForm = props => {
  const history = useHistory();
  const {
    store: { setRegisterData }
  } = props;
  return (
    <Formik
      initialValues={{ phone: "078987923", email: "richard@gmail.com" }}
      onSubmit={values => {
        setRegisterData(values);
        history.push("/register/three");
      }}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <>
          <Box f={1}>
            <InputText
              placeholder="Nomor Handphone"
              formikProps={formikProps}
              formikKey="phone"
              leadingIcon={phoneIcon}
              color={theme.color.purple}
              keyboardType="phone-pad"
              value={formikProps.values.phone}
              autoFocus
            ></InputText>
            <InputText
              placeholder="Email"
              formikProps={formikProps}
              formikKey="email"
              leadingIcon={mailIcon}
              color={theme.color.purple}
              keyboardType="email-address"
              value={formikProps.values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            ></InputText>
          </Box>
          <Box mb="md">
            <RoundButton
              text="Lanjut"
              width="100%"
              textSize="md"
              color={theme.color.purple}
              onPress={formikProps.handleSubmit}
            ></RoundButton>
          </Box>
        </>
      )}
    </Formik>
  );
};

export default inject("store")(observer(RegisterTwoForm));
