import React, { useContext } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { SvgXml } from "react-native-svg";
import AppbarWithNotification from "../../components/commons/AppbarWithNotification";
import SvgText from "../../components/commons/SvgText";
import { lineOne, lineTwo } from "../../components/user/util/homeIconMenus";
import { AuthContext } from "../../contexts";
import { images } from "../../utils/images";
import { hiMommyPurple } from "../../utils/svgs";
import useIsAuth from "../../hooks/useIsAuth";
import useDoubleBackExit from "../../hooks/useDoubleBackExit";

const Home = ({ history }) => {
  useIsAuth();
  useDoubleBackExit();
  const { user } = useContext(AuthContext);

  return (
    <>
      <AppbarWithNotification title="HOME"></AppbarWithNotification>
      <Box f={1}>
        <Box py="md" px="md">
          <Box dir="row" rows={[3, 1]} align="end" mb="sm" mt="md">
            <Box w="50%" h={80} pt="sm">
              <SvgXml xml={hiMommyPurple} width="100%" height="100%" />
            </Box>

            <Box>
              <TouchableOpacity onPress={() => history.push("/user/profile")}>
                <Box avatar circle={90}>
                  {user.avatar && user.avatar != "" ? (
                    <Image source={{ uri: user.avatar }}></Image>
                  ) : (
                    <Image source={images.defaultUser}></Image>
                  )}
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
          <Box>
            <Text>
              Berikan yang terbaik untuk si Baby pada hari ini sampai dengan
              dimana Baby dapat melihat dunia bersama Mommy tercinta.
            </Text>
          </Box>
        </Box>

        <Box dir="row" justify="evenly" mt="lg">
          {lineOne.map((data, index) => (
            <SvgText
              key={index}
              text={data.text}
              xml={data.xml}
              to={data.to}
              size={60}
            ></SvgText>
          ))}
        </Box>
        <Box dir="row" justify="evenly" mt="lg">
          {lineTwo.map((data, index) => (
            <SvgText
              key={index}
              text={data.text}
              xml={data.xml}
              to={data.to}
              size={60}
            ></SvgText>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Home;
