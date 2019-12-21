import axios from "axios";
import initAxios from "../helpers/initAxios";

class TocologistServiceApi {
  async getAll(page) {
    await initAxios();
    const response = await axios
      .get(`/tocologist-services?page=${page}&limit=10`)
      .then(res => res.data);
    return response;
  }

  async store(data) {
    await initAxios();
    const response = await axios
      .post("tocologist-services", data)
      .then(res => res.data);
    return response;
  }

  async update(data) {
    await initAxios();
    const response = await axios
      .put(`tocologist-services/${data.id}`, data)
      .then(res => res.data);
    return response;
  }

  async remove(id) {
    await initAxios();
    const response = await axios
      .delete(`tocologist-services/${id}`)
      .then(res => res.data);
    return response;
  }

  async getCommonServices() {
    await initAxios();
    const response = await axios
      .get("common-tocologist-services")
      .then(res => res.data);
    return response;
  }
}

export default new TocologistServiceApi();
