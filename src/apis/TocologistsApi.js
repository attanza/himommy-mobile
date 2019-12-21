import axios from "axios";
import initAxios from "../helpers/initAxios";
class TocologistsApi {
  async getAll(page, search) {
    await initAxios();
    const response = await axios
      .get(
        `/tocologists?page=${page}&limit=10&lat=-6.917464&lng=107.61912&search=${search}`
      )
      .then(res => res.data);
    return response;
  }

  async get(id) {
    await initAxios();
    const response = await axios
      .get(`/tocologists/${id}`)
      .then(res => res.data);
    return response;
  }
}

export default new TocologistsApi();
