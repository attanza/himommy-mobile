import PropTypes from "prop-types";
import React from "react";
import { Box, Text } from "react-native-design-utility";

const SimpleTable = ({ title, data }) => {
  return (
    <Box>
      {title && (
        <Box mb="sm">
          <Text weight="bold">{title}</Text>
        </Box>
      )}
      {Object.keys(data).map(d => (
        <Box dir="row" key={d}>
          <Box w="40%">
            <Text size="sm">{d}</Text>
          </Box>
          <Box>
            <Text>:</Text>
          </Box>
          <Box ml="xs" w="60%">
            <Text size="sm">{data[d]}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

SimpleTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object.isRequired
};

export default SimpleTable;
