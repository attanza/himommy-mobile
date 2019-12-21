import moment from "../../../utils/Moment";

export const formKeys = [
  {
    key: "first_name",
    type: "text",
    placeholder: "Nama Depan",
    dataType: "string",
    props: {}
  },
  {
    key: "last_name",
    type: "text",
    placeholder: "Nama Belakang",
    dataType: "string",
    props: {}
  },
  {
    key: "email",
    type: "text",
    placeholder: "Email",
    dataType: "string",
    props: {
      keyboardType: "email-address"
    }
  },
  {
    key: "phone",
    type: "text",
    placeholder: "No. Hp",
    dataType: "string",
    props: {
      keyboardType: "phone-pad"
    }
  },
  {
    key: "dob",
    type: "date",
    placeholder: "Tanggal Lahir",
    dataType: "date",
    props: {}
  },
  {
    key: "education",
    type: "text",
    placeholder: "Pendidikan",
    dataType: "string",
    props: {}
  },
  {
    key: "height",
    type: "text",
    placeholder: "Berat Badan / cm",
    dataType: "number",
    props: {
      keyboardType: "number-pad"
    }
  },
  {
    key: "weight",
    type: "text",
    placeholder: "Berat Badan / Kg",
    dataType: "number",
    props: {
      keyboardType: "number-pad"
    }
  },
  {
    key: "hpht",
    type: "date",
    placeholder: "Hari Pertama Haid Terakhir",
    dataType: "date",
    props: {}
  },
  {
    key: "husband_name",
    type: "text",
    placeholder: "Nama Suami",
    dataType: "string",
    props: {}
  },
  {
    key: "occupation",
    type: "text",
    placeholder: "Pekerjaan",
    dataType: "string",
    props: {}
  }
];

export const generateInitialValues = user => {
  const initialValues = {};
  let userData = {};
  if (Object.keys(user).length > 0) {
    userData = Object.assign({}, user);
    delete userData["detail"];

    if (user.detail) {
      Object.keys(user.detail).map(
        detail => (userData[detail] = user.detail[detail])
      );
    }
  }

  formKeys.map(
    k =>
      (initialValues[k.key] = userData[k.key]
        ? userData[k.key].toString()
        : getDefaultValue(k.dataType))
  );

  return initialValues;
};

const getDefaultValue = dataType => {
  const now = moment();
  switch (dataType) {
    case "number":
      return "1";

    case "date":
      return now.format("YYYY-MM-DD").toString();

    default:
      return "";
  }
};
