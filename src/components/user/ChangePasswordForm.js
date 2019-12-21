import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { Box, Text } from "react-native-design-utility";
import ProfileApi from "../../apis/ProfileApi";
import { AuthContext } from "../../contexts/authContext";
import { theme } from "../../utils/theme";
import ConfirmDialog from "../commons/ConfirmDialog";
import InputPassword from "../commons/form/InputPassword";
import RoundButton from "../commons/RoundButton";
import passwordScheema from "./util/passwordScheema";
import { showMessage } from "react-native-flash-message";

const ChangePasswordForm = () => {
  const context = useContext(AuthContext);

  const [showConfirm, setShowConfirm] = useState(false);
  const [formikValues, setFormikValues] = useState(null);

  const closeConfirm = () => {
    setShowConfirm(false);
  };

  const onConfirm = async () => {
    try {
      setShowConfirm(false);
      formikValues.id = context.user.id;
      context.showLoader(true);
      await ProfileApi.changePassword(formikValues);
      context.showLoader(false);

      showMessage({
        message: "Kata sandi berhasil diubah",
        type: "success"
      });
    } catch (e) {
      context.showLoader(false);

      showMessage({
        message: "Kata sandi gagal diubah",
        type: "danger"
      });
    }
  };

  const handleSubmit = async values => {
    setFormikValues(values);
    setShowConfirm(true);
  };

  return (
    <Box mt="sm">
      <ConfirmDialog
        showConfirm={showConfirm}
        closeConfirm={closeConfirm}
        title="Hi Mommy"
        subtitle="Yakin mommy mau melakukan perubahan password ?"
        onConfirm={onConfirm}
      ></ConfirmDialog>
      <Text>RUBAH KATA SANDI</Text>
      <Box mt="sm">
        <Formik
          initialValues={{
            oldPassword: "",
            password: "",
            passwordConfirmation: ""
          }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
          validationSchema={passwordScheema}
        >
          {formikProps => (
            <>
              <InputPassword
                placeholder="Sandi lama"
                formikProps={formikProps}
                formikKey="oldPassword"
                color={theme.color.purple}
                value={formikProps.values.oldPassword}
              ></InputPassword>

              <InputPassword
                placeholder="Sandi baru"
                formikProps={formikProps}
                formikKey="password"
                color={theme.color.purple}
                value={formikProps.values.password}
              ></InputPassword>

              <InputPassword
                placeholder="Konfirmasi sandi"
                formikProps={formikProps}
                formikKey="passwordConfirmation"
                color={theme.color.purple}
                value={formikProps.values.passwordConfirmation}
              ></InputPassword>

              <RoundButton
                text="Rubah Kata Sandi"
                width="100%"
                padding="sm"
                textSize="sm"
                color={theme.color.purple}
                onPress={formikProps.handleSubmit}
              ></RoundButton>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ChangePasswordForm;
