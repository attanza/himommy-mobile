import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useContext } from "react";
import { Box } from "react-native-design-utility";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import AuthApi from "../../apis/AuthApi";
import { AuthContext } from "../../contexts/authContext";
import catchError from "../../helpers/catchError";
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

const LoginForm = () => {
  const context = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async values => {
    try {
      context.showLoader(true);
      await AuthApi.login({
        uid: values.uid,
        password: values.password
      });
      const user = await AuthApi.getMe();
      context.setUser(user);
      context.showLoader(false);
      await checkUserRole(user, history);
    } catch (e) {
      context.showLoader(false);
      catchError(e);
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

export default LoginForm;
