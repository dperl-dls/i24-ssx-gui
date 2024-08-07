import * as React from "react";
import { ChakraProvider, Box, Text, VStack, Grid, theme, HStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { PollingRoPvBox } from "./components/pv";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <HStack spacing="80vw">
            <Text fontSize="4xl">I24 SSX</Text>
            <ColorModeSwitcher justifySelf="flex-end" />
          </HStack>
          <Tabs>
            <TabList>
              <Tab>Smargon positions</Tab>
              <Tab>2</Tab>
              <Tab>3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <HStack spacing={2}>
                  <VStack spacing={1}>
                    <PollingRoPvBox name="omega" pv="BL03I-MO-SGON-01:OMEGA.RBV" />
                    <PollingRoPvBox name="X" pv="BL03I-MO-SGON-01:X.RBV" />
                    <PollingRoPvBox name="Y" pv="BL03I-MO-SGON-01:Y.RBV" />
                    <PollingRoPvBox name="Z" pv="BL03I-MO-SGON-01:Z.RBV" />
                  </VStack>
                </HStack>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
