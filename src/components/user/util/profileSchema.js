import * as yup from "yup";
import msg from "../../../utils/validationMessages";

export default yup.object().shape({
  first_name: yup
    .string()
    .max(50, msg.max("Nama Depan", 50))
    .required(msg.required("Nama Depan")),

  last_name: yup.string().max(50, msg.max("Nama Belakang", 50)),

  email: yup
    .string()
    .email(msg.email("Email"))
    .required(msg.required("Email")),

  phone: yup
    .string()
    .max(30, msg.max("Nomor handphone", 30))
    .required(msg.required("Nomor handphone")),

  dob: yup.date(msg.date("Tanggal Lahir")).notRequired(),

  education: yup
    .string()
    .max(50, msg.max("Nomor handphone", 50))
    .notRequired(),

  height: yup
    .number()
    .notRequired()
    .positive(msg.positive("Tinggi Badan"))
    .integer(),

  hpht: yup.date(msg.date("Tanggal Lahir")).notRequired(),

  husband_name: yup
    .string()
    .max(100, msg.max("Nomor handphone", 100))
    .notRequired(),

  occupation: yup
    .string()
    .max(100, msg.max("Nomor handphone", 100))
    .notRequired(),

  weight: yup
    .number()
    .notRequired()
    .positive(msg.positive("Berat Badan"))
    .integer()
});
