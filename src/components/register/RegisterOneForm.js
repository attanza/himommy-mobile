import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useContext } from "react";
import { Box } from "react-native-design-utility";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import RoundButton from "../../components/commons/RoundButton";
import { theme } from "../../utils/theme";
import InputText from "../commons/form/InputText";
import { inject, observer } from "mobx-react";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(50, "Nama depan tidak boleh lebih dari 50 karakter")
    .required("Nama depan diperlukan"),
  lastName: yup
    .string()
    .max(50, "Nama belakang tidak boleh lebih dari 50 karakter")
});

const leadingIcon = () => (
  <AntDesign name="user" size={32} color={theme.color.purple}></AntDesign>
);
const RegisterOneForm = props => {
  const history = useHistory();
  const {
    store: { setRegisterData }
  } = props;
  return (
    <Box f={1}>
      <Formik
        initialValues={{ firstName: "Richard", lastName: "Benson" }}
        onSubmit={values => {
          setRegisterData(values);
          history.push("/register/two");
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <>
            <Box f={1}>
              <InputText
                placeholder="Nama Depan"
                formikProps={formikProps}
                formikKey="firstName"
                color={theme.color.purple}
                leadingIcon={leadingIcon}
                value={formikProps.values.firstName}
                autoFocus
              ></InputText>
              <InputText
                placeholder="Nama Belakang"
                formikProps={formikProps}
                formikKey="lastName"
                color={theme.color.purple}
                value={formikProps.values.lastName}
                leadingIcon={leadingIcon}
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
    </Box>
  );
};

export default inject("store")(observer(RegisterOneForm));
