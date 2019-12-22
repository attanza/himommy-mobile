import { Formik } from "formik";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Keyboard } from "react-native";
import { Box } from "react-native-design-utility";
import * as yup from "yup";
import AuthApi from "../../apis/AuthApi";
import RoundButton from "../../components/commons/RoundButton";
import catchError from "../../helpers/catchError";
import { msg, theme } from "../../utils";
import InputPassword from "../commons/form/InputPassword";
import InfoDialog from "../commons/InfoDialog";
import { withRouter } from "react-router-dom";
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

class RegisterThreeForm extends Component {
  state = {
    showInfo: false
  };

  submitData = async values => {
    const { showLoader, registerData } = this.props.store;
    try {
      Keyboard.dismiss();
      showLoader(true);
      const postData = {
        first_name: registerData.firstName,
        last_name: registerData.lastName,
        email: registerData.email,
        phone: registerData.phone,
        password: values.password
      };
      await AuthApi.register(postData);
      showLoader(false);
      setTimeout(() => {
        this.showConfirm();
      }, 700);
    } catch (e) {
      catchError(e, this.props.store);
    }
  };

  showConfirm = () => {
    this.setState({ showInfo: true });
  };

  closeConfirm = () => {
    this.setState({ showInfo: false }, () => {
      this.props.history.push("/auth/login");
    });
  };

  render() {
    const { showInfo } = this.state;
    return (
      <>
        <InfoDialog
          showConfirm={showInfo}
          closeConfirm={this.closeConfirm}
          title="Registrasi Berhasil"
          message="Silahkan aktifkan akun anda, kami telah mengirimkan link aktifasi melalui email yang anda daftarkan"
        ></InfoDialog>
        <Formik
          initialValues={{
            password: "password",
            passwordConfirmation: "password"
          }}
          onSubmit={values => {
            this.submitData(values);
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
  }
}

export default withRouter(inject("store")(observer(RegisterThreeForm)));
