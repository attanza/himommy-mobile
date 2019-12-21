import axios from "axios";
import initAxios from "../helpers/initAxios";
class TocologistsApi {
  async getAll(page) {
    await initAxios();
    const response = await axios
      .get(`reservations?page=${page}&limit=10`)
      .then(res => res.data);
    return response;
  }

  async store(data) {
    await initAxios();
    const response = await axios
      .post("/reservations", data)
      .then(res => res.data);
    return response;
  }
}

export default new TocologistsApi();
