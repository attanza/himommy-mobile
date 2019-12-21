import axios from "axios";
import initAxios from "../helpers/initAxios";

class AppVersionApi {
  async getFromClient(platform) {
    await initAxios();
    const response = await axios
      .get(`app-version?platform=${platform}`)
      .then(res => res.data);
    return response;
  }
}

export default new AppVersionApi();
