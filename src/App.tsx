import * as React from "react";
import { ChakraProvider, Box, Text, VStack, Grid, theme, HStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { SCREENS, TabbedScreens } from "./screens/main";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <HStack spacing="80vw">
            <Text fontSize="4xl">I24 SSX</Text>
            <ColorModeSwitcher justifySelf="flex-end" />
          </HStack>
          <TabbedScreens screens={SCREENS} />
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
