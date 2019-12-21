import * as yup from "yup";
import msg from "../../../utils/validationMessages";

export default yup.object().shape({
  oldPassword: yup.string().required(msg.required("Sandi lama")),

  password: yup
    .string()
    .min(6, msg.min("Sandi baru", 6))
    .required(msg.required("Sandi baru")),

  passwordConfirmation: yup
    .string()
    .required(msg.required("Konfirmasi kata sandi"))
    .test("password-match", "Konfirmasi sandi todak cocok", function(value) {
      return this.parent.password === value;
    })
});
