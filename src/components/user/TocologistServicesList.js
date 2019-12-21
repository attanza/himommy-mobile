import PropTypes from "prop-types";
import React from "react";
import { Box, Text } from "react-native-design-utility";

const TocologistServicesList = ({ services }) => {
  return (
    <Box>
      <Text weight="bold">PELAYANAN</Text>
      <Box mt="sm">
        {services &&
          services.map((service, index) => (
            <Box key={index} dir="row">
              <Text>{index + 1}. </Text>
              <Text>{service.name}</Text>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

TocologistServicesList.propTypes = {
  services: PropTypes.array
};

export default TocologistServicesList;
