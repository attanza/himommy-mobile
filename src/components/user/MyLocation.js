import React from "react";
import { Box, Text } from "react-native-design-utility";
import { SvgXml } from "react-native-svg";
import { myLocation } from "../../utils/svgs";
const MyLocation = () => {
  return (
    <Box w="100%" h="7%" mt="md" mb="sm" dir="row" rows={[1, 3]}>
      <Box center>
        <Box h={40} w={40}>
          <SvgXml xml={myLocation} width="100%" height="100%" />
        </Box>
      </Box>
      <Box>
        <Box>
          <Text weight="bold" size="sm">
            LOKASI ANDA
          </Text>
        </Box>
        <Box pr="md">
          <Text size="xs">
            Jl. Sukapura 1 Gg. Pura pura Kec. Pura pura kaya RT 001/002 No. 003
          </Text>
        </Box>
      </Box>
      {/* <Box center>
        <TouchableOpacity>
          <Box h={40} w={40}>
            <SvgXml xml={filter} width="100%" height="100%" />
          </Box>
        </TouchableOpacity>
        <Text size="xs">Filter</Text>
      </Box> */}
    </Box>
  );
};

export default MyLocation;
