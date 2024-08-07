import * as React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

const getPvQuery = (pv: string) => gql(`
  query {
    getChannel(id: "${pv}") {
      value {
        float
      }
    }
  }
`)

export const PollingRoPvBox = ({
  name,
  pv,
  pollInterval = 100,
  sigFigs = 4,
}: {
  name: string;
  pv: string;
  pollInterval?: number;
  sigFigs?: number;
}) => {
  const { loading, error, data } = useQuery(getPvQuery(pv),{pollInterval: pollInterval});
  const result = () => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return data.getChannel.value.float.toFixed(sigFigs);
  };
  return (
    <HStack spacing={2}>
      <Box borderWidth={1} padding={1}>
        <Text>{name}:</Text>
      </Box>
      <Box borderWidth={1} padding={1}>
        <Text>{result()}</Text>
      </Box>
    </HStack>
  );
};
