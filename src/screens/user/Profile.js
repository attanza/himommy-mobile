import React, { useContext, useEffect } from "react";
import { Image, ScrollView } from "react-native";
import { Box } from "react-native-design-utility";
import { SvgXml } from "react-native-svg";
import AppbarWithAction from "../../components/commons/AppbarWithAction";
import CustomScrollView from "../../components/commons/CustomScrollView";
import ChangePasswordForm from "../../components/user/ChangePasswordForm";
import ProfileForm from "../../components/user/ProfileForm";
import { AuthContext, MqttContext } from "../../contexts";
import { defaultUser } from "../../utils/svgs";
import UploadAvatar from "../../components/commons/UploadAvatar";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { setConnection } = useContext(MqttContext);

  useEffect(() => {
    setConnection({
      isOpenConnection: true,
      topics: [`himommy/profile/${user.uid}`]
    });
    return () => setConnection({ topics: [] });
  }, []);
  return (
    <>
      <AppbarWithAction
        title="EDIT PROFILE"
        link="/user"
        confirmTitle="Hi Mommy"
        confirmSubtitle="Mommy yakin ingin keluar dari aplikasi ?"
      ></AppbarWithAction>
      <CustomScrollView>
        <ScrollView>
          <Box center mt="sm">
            <Box avatar circle={90}>
              {user.avatar && user.avatar != "" ? (
                <Image source={{ uri: user.avatar }}></Image>
              ) : (
                <Box w={90} h={90} pt="sm">
                  <SvgXml xml={defaultUser} width="100%" height="100%" />
                </Box>
              )}
            </Box>
          </Box>
          <UploadAvatar></UploadAvatar>
          <Box px="lg" mt="md">
            <ProfileForm></ProfileForm>

            {user.current_auth_provider === "local" && (
              <>
                <Box
                  my="xs"
                  style={{ borderBottomWidth: 1, borderBottomColor: "#E5E5E5" }}
                ></Box>
                <ChangePasswordForm></ChangePasswordForm>
              </>
            )}
          </Box>
        </ScrollView>
      </CustomScrollView>
    </>
  );
};

export default Profile;
