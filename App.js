import React, { useEffect, useState } from "react";
import { Box, UtilityThemeProvider } from "react-native-design-utility";
import Router from "./src/Router";
import { theme } from "./src/utils/theme";
import { ActivityIndicator } from "react-native";
import { cacheImages } from "./src/utils/cacheImages";
import { images } from "./src/utils/images";
export default function App() {
  const [isReady, setIsReady] = useState(false);

  const cacheAssets = async () => {
    const imageAssets = cacheImages(Object.values(images));
    await Promise.all([...imageAssets]);
    setIsReady(true);
  };

  useEffect(() => {
    cacheAssets();
  }, []);

  if (!isReady) {
    return (
      <Box f={1} center bg="white">
        <ActivityIndicator
          size="large"
          color={theme.color.red}
        ></ActivityIndicator>
      </Box>
    );
  }

  return (
    <UtilityThemeProvider theme={theme}>
      <Router></Router>
    </UtilityThemeProvider>
  );
}
