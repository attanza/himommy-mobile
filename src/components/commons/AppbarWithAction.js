import { FontAwesome, AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { removeToken } from "../../helpers/tokenHelper";
import { theme } from "../../utils/theme";
import ConfirmDialog from "./ConfirmDialog";
const AppbarWithAction = ({ title, link, confirmTitle, confirmSubtitle }) => {
  const history = useHistory();

  const { logout } = useContext(AuthContext);

  const [showConfirm, setShowConfirm] = useState(false);
  const handlePress = () => {
    history.push(link);
  };

  const handleLogout = () => {
    Keyboard.dismiss(0);
    setShowConfirm(true);
  };

  const closeConfirm = () => {
    if (showConfirm) setShowConfirm(false);
  };

  const onConfirm = async () => {
    if (showConfirm) setShowConfirm(false);
    logout();
    await removeToken();
    setTimeout(() => {
      history.push("/auth/login");
    }, 500);
  };
  return (
    <Box w="100%" h="10%" mt="xs">
      <ConfirmDialog
        showConfirm={showConfirm}
        closeConfirm={closeConfirm}
        title={confirmTitle || null}
        subtitle={confirmSubtitle || null}
        onConfirm={onConfirm}
        okText="Ya"
        noText="Tidak"
      ></ConfirmDialog>
      <Box f={1}>
        <Box f={1}></Box>
        <Box f={1} rows={[1, 2, 1]} dir="row" align="center">
          <Box pl="md">
            <TouchableOpacity onPress={handlePress}>
              <FontAwesome name="angle-left" size={40}></FontAwesome>
            </TouchableOpacity>
          </Box>
          <Box center>
            <Text size="sm">{title}</Text>
          </Box>
          <Box pr="md" f={1} align="end">
            <TouchableOpacity onPress={handleLogout}>
              <Box center>
                <Box>
                  <AntDesign name="logout" size={32} color={theme.color.red} />
                </Box>
                <Box mt="2xs">
                  <Text size="xs">Logout</Text>
                </Box>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

AppbarWithAction.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  confirmTitle: PropTypes.string,
  confirmSubtitle: PropTypes.string.isRequired
};

export default AppbarWithAction;
