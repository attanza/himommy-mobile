import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { Box } from "react-native-design-utility";
import * as yup from "yup";
import RoundButton from "../../components/commons/RoundButton";
import { AuthContext, RegisterContext } from "../../contexts";
import catchError from "../../helpers/catchError";
import { msg, theme } from "../../utils";
import InputPassword from "../commons/form/InputPassword";
import AuthApi from "../../apis/AuthApi";
import { showMessage } from "react-native-flash-message";
import InfoDialog from "../commons/InfoDialog";
import { useHistory } from "react-router-dom";
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Kata sandi tidak boleh kurang dari 6 karakter")
    .required("Kata sandi diperlukan"),
  passwordConfirmation: yup
    .string()
    .required(msg.required("Konfirmasi kata sandi"))
    .test("password-match", "Konfirmasi sandi todak cocok", function(value) {
      return this.parent.password === value;
    })
});

const RegisterThreeForm = () => {
  const history = useHistory();
  const { showLoader } = useContext(AuthContext);
  const { firstName, lastName, email, phone } = useContext(RegisterContext);
  const [showInfo, setShowInfo] = useState(false);

  const submitData = async values => {
    try {
      Keyboard.dismiss();
      showLoader(true);
      const postData = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password: values.password
      };
      await AuthApi.register(postData);
      showLoader(false);
      setTimeout(() => {
        showConfirm();
      }, 700);
    } catch (e) {
      const message = await catchError(e);
      showLoader(false);
      showMessage({
        message,
        type: "danger"
      });
    }
  };

  const showConfirm = () => setShowInfo(true);

  const closeConfirm = () => {
    if (showInfo) setShowInfo(false);
    history.push("/auth/login");
  };

  return (
    <>
      <InfoDialog
        showConfirm={showInfo}
        closeConfirm={closeConfirm}
        title="Registrasi Berhasil"
        message="Silahkan aktifkan akun anda, kami telah mengirimkan link aktifasi melalui email yang anda daftarkan"
      ></InfoDialog>
      <Formik
        initialValues={{
          password: "password",
          passwordConfirmation: "password"
        }}
        onSubmit={values => {
          submitData(values);
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <>
            <Box f={1}>
              <InputPassword
                placeholder="Kata Sandi"
                formikProps={formikProps}
                formikKey="password"
                color={theme.color.purple}
                value={formikProps.values.password}
                autoFocus
              ></InputPassword>
              <InputPassword
                placeholder="Konfirmasi Kata Sandi"
                formikProps={formikProps}
                formikKey="passwordConfirmation"
                color={theme.color.purple}
                value={formikProps.values.passwordConfirmation}
              ></InputPassword>
            </Box>
            <Box mb="md">
              <RoundButton
                text="Daftar"
                width="100%"
                textSize="md"
                color={theme.color.purple}
                onPress={formikProps.handleSubmit}
              ></RoundButton>
            </Box>
          </>
        )}
      </Formik>
    </>
  );
};

export default RegisterThreeForm;
