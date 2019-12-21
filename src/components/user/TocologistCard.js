// import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { useHistory } from "react-router-dom";
import { theme } from "../../utils/theme";
const TocologistCard = ({ item }) => {
  const history = useHistory();
  const { avatar, name, address, distance, uid } = item;
  return (
    <Box w="100%" bg="#fde8f1" radius="base" p="sm" mb="xs">
      <TouchableOpacity
        onPress={() => history.push(`/user/tocologists/${uid}`)}
      >
        <Box dir="row" rows={[1, 3, 1]}>
          <Box avatar circle={60}>
            <Image source={{ uri: avatar }}></Image>
          </Box>
          <Box dir="col">
            <Box>
              <Text weight="bold" size="sm">
                {name}
              </Text>
            </Box>
            <Box>
              <Text size="xs">{address}</Text>
            </Box>
            <Box>
              <Text size="xs">Jarak {Math.floor(distance)} Km</Text>
            </Box>
          </Box>
          <Box center>
            <AntDesign
              name="right"
              size={40}
              color={theme.color.red}
            ></AntDesign>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

// TocologistCard.propTypes = {
//   tocologist: PropTypes.object.isRequired
// };

export default TocologistCard;
