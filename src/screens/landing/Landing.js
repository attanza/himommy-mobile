import { FontAwesome } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Box } from "react-native-design-utility";
import { theme } from "../../utils/theme";
import LandingOne from "./LandingOne";
import LandingThree from "./LandingThree";
import LandingTwo from "./LandingTwo";
const screenWidth = Math.round(Dimensions.get("window").width);

const Landing = () => {
  const scrollEl = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = event => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.x / screenWidth);
    if (currentIndex !== index) {
      setCurrentIndex(index);
    }
  };

  return (
    <>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollEl}
        onScroll={handleScroll}
      >
        <Box width={screenWidth} f={1}>
          <LandingOne></LandingOne>
        </Box>
        <Box width={screenWidth} f={1}>
          <LandingTwo></LandingTwo>
        </Box>
        <Box width={screenWidth} f={1}>
          <LandingThree></LandingThree>
        </Box>
      </ScrollView>
      <Box
        width="100%"
        position="absolute"
        left={0}
        bottom={0}
        right={0}
        h={50}
      >
        <Box dir="row" justify="center" align="center">
          {Array.from({ length: 3 }).map((_, i) => (
            <Box key={i} mr="sm">
              <FontAwesome
                name={i === currentIndex ? "circle" : "dot-circle-o"}
                size={20}
                color={theme.color.red}
              ></FontAwesome>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Landing;
