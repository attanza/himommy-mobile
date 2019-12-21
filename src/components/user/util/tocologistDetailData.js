export const getDetail = tocologist => {
  return {
    Nama: tocologist.name || "",
    "Nomor Telepon": tocologist.phone || "",
    Alamat: tocologist.address || ""
  };
};

export const getServices = tocologist => {
  let services = [];
  if (tocologist.services.length > 0) {
    tocologist.services.map(s =>
      services.push({
        name: s.service ? s.service.name : "",
        price: s.price
      })
    );
  }
  return services;
};
