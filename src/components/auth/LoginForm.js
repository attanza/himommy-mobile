import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import { inject, observer } from "mobx-react";
import React from "react";
import { Box } from "react-native-design-utility";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import AuthApi from "../../apis/AuthApi";
import checkUserRole from "../../helpers/checkUserRole";
import { theme } from "../../utils/theme";
import InputPassword from "../commons/form/InputPassword";
import InputText from "../commons/form/InputText";
import RoundButton from "../commons/RoundButton";

const validationSchema = yup.object().shape({
  uid: yup.string().required("Email atau nomor handphone diperlukan"),
  password: yup.string().required("Password diperlukan")
});

const userIcon = () => (
  <AntDesign name="user" size={32} color={theme.color.red}></AntDesign>
);

const LoginForm = props => {
  const {
    store: { showLoader, setUser, showMessage }
  } = props;
  const history = useHistory();

  const handleSubmit = async values => {
    try {
      showLoader(true);
      await AuthApi.login({
        uid: values.uid,
        password: values.password
      });
      const user = await AuthApi.getMe();
      setUser(user);
      showLoader(false);
      await checkUserRole(user, history);
    } catch (e) {
      showLoader(false);
      showMessage({
        type: "danger",
        text: "Login gagal, periksa kembali kredensial anda."
      });
    }
  };

  return (
    <Box>
      <Formik
        initialValues={{
          uid: "ajeng@gmail.com",
          password: "password"
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <>
            <InputText
              placeholder="Email / No Handphone"
              formikProps={formikProps}
              formikKey="uid"
              color={theme.color.red}
              autoCapitalize="none"
              value={formikProps.values.uid}
              leadingIcon={userIcon}
            ></InputText>
            <InputPassword
              placeholder="Password"
              formikProps={formikProps}
              formikKey="password"
              color={theme.color.red}
              autoCapitalize="none"
              value={formikProps.values.password}
            ></InputPassword>

            <RoundButton
              text="Login"
              width="100%"
              textSize="md"
              color={theme.color.red}
              onPress={formikProps.handleSubmit}
            ></RoundButton>
          </>
        )}
      </Formik>
    </Box>
  );
};

export default inject("store")(observer(LoginForm));
