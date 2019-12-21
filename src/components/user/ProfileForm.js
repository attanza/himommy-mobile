import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { Box } from "react-native-design-utility";
import { showMessage } from "react-native-flash-message";
import ProfileApi from "../../apis/ProfileApi";
import { AuthContext } from "../../contexts/authContext";
import { theme } from "../../utils/theme";
import ConfirmDialog from "../commons/ConfirmDialog";
import { InputText, InputDate } from "../commons/form";
import RoundButton from "../commons/RoundButton";
import profileSchema from "./util/profileSchema";
import { formKeys, generateInitialValues } from "./util/profileFields";
import catchError from "../../helpers/catchError";

const ProfileForm = () => {
  const { user, showLoader, setUser } = useContext(AuthContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formikValues, setFormikValues] = useState(null);

  const initialValues = generateInitialValues(user);

  const closeConfirm = () => {
    setShowConfirm(false);
  };

  const onConfirm = async () => {
    try {
      setShowConfirm(false);
      formikValues.id = user.id;
      showLoader(true);
      const resp = await ProfileApi.update(formikValues);
      setUser(resp.data);
      showLoader(false);
      showMessage({
        message: "Data profil berhasil diperbaharui",
        type: "success"
      });
    } catch (e) {
      console.log("e", e);
      showLoader(false);
      const message = await catchError(e);
      showMessage({
        message,
        type: "danger"
      });
    }
  };

  const handleSubmit = async values => {
    setFormikValues(values);
    setShowConfirm(true);
  };

  return (
    <Box>
      <ConfirmDialog
        showConfirm={showConfirm}
        closeConfirm={closeConfirm}
        title="Hi Mommy"
        subtitle="Yakin mommy mau melakukan perubahan data profile ?"
        onConfirm={onConfirm}
      ></ConfirmDialog>

      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSubmit(values)}
        validationSchema={profileSchema}
      >
        {formikProps => (
          <>
            {formKeys.map(f => (
              <Box key={f.key}>
                {f.type === "date" && (
                  <InputDate
                    title={f.placeholder}
                    formikProps={formikProps}
                    formikKey={f.key}
                    color={theme.color.purple}
                    mode="date"
                  ></InputDate>
                )}
                {f.type === "text" && (
                  <InputText
                    title={f.placeholder}
                    formikProps={formikProps}
                    formikKey={f.key}
                    color={theme.color.purple}
                    value={formikProps.values[f.key]}
                    {...f.props}
                  ></InputText>
                )}
              </Box>
            ))}

            <RoundButton
              text="Perbaharui"
              width="100%"
              color={theme.color.purple}
              onPress={formikProps.handleSubmit}
            ></RoundButton>
          </>
        )}
      </Formik>
    </Box>
  );
};

export default ProfileForm;
