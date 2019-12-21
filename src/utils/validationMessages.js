export default {
  required: field => `${field} diperlukan`,
  max: (field, arg) => `${field} tidak boleh lebih dari ${arg} karakter`,
  min: (field, arg) => `${field} tidak boleh kurang dari ${arg} karakter`,
  email: field => `${field} harus berupa alamat email yang valid`,
  number: field => `${field} harus berupa angka`,
  date: field => `${field} harus berupa format tanggal`,
  positive: field => `${field} harus lebih besar dari 0`
};
