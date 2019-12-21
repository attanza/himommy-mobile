import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import React, { useEffect, useContext } from "react";
import { Box } from "react-native-design-utility";
import ProfileApi from "../../apis/ProfileApi";
import { theme } from "../../utils/theme";
import RoundButton from "../commons/RoundButton";
import { AuthContext } from "../../contexts/authContext";

const UpoadAvatar = () => {
  const { user, setUser } = useContext(AuthContext);
  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert(
          "Permisi kamera dierlukan agar anda dapat mengupdate photo profile anda"
        );
      }
    }
  };
  useEffect(() => {
    getPermissionAsync();
  }, []);

  const _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4
    });

    if (!result.cancelled) {
      const editedUser = { ...user, avatar: result.uri };
      setUser(editedUser);
      ProfileApi.uploadAvatar(result.uri);
    }
  };

  return (
    <Box mt="md">
      <RoundButton
        text="GANTI FOTO"
        onPress={_pickImage}
        color={theme.color.purple}
        width="30%"
        textSize="xs"
        padding="xs"
      ></RoundButton>
    </Box>
  );
};

export default UpoadAvatar;
