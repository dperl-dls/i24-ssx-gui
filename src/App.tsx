import * as React from "react";
import { ChakraProvider, Box, Text, VStack, Grid, theme, HStack, Button } from "@chakra-ui/react";
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
              <Tab>Detector stage</Tab>
              <Tab>2</Tab>
              <Tab>3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <HStack spacing={2}>
                  <VStack spacing={1}>
                    <PollingRoPvBox name="Detector" pv="ME14E-MO-IOC-01:GP101" dType="string" />
                    <PollingRoPvBox name="Detector stage position" pv="BL24I-EA-DET-01:Y" />
                    <Button>Move stage!</Button>
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
