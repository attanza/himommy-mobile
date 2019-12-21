import axios from "axios";
import initAxios from "../helpers/initAxios";
import { storeUser } from "../helpers/tokenHelper";

class ProfileApi {
  async update(data) {
    await initAxios();
    const response = await axios
      .put(`/profile/${data.id}`, data)
      .then(res => res.data);
    await storeUser(response.data);
    return response;
  }

  async changePassword(data) {
    await initAxios();

    const response = await axios
      .post("/profile/change-password", {
        old_password: data.oldPassword,
        password: data.password
      })
      .then(res => res.data);
    await storeUser(response.data);
    return response;
  }

  async uploadAvatar(uri) {
    await initAxios();
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append("avatar", {
      uri,
      name: "Hi-mommy-image",
      type: `image/${fileType}`
    });

    const response = await axios
      .post("/profile/upload-avatar", formData, config)
      .then(res => res.data);
    await storeUser(response.data);

    return response;
  }
}

export default new ProfileApi();
