import * as React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

const getPvQuery = (pv: string, type:string) => gql(`
  query {
    getChannel(id: "${pv}") {
      value {
        ${type}
      }
    }
  }
`)

export const PollingRoPvBox = ({
  name,
  pv,
  pollInterval = 100,
  sigFigs = 4,
  dType = "float"
}: {
  name: string;
  pv: string;
  pollInterval?: number;
  sigFigs?: number;
  dType?: string;
}) => {
  const { loading, error, data } = useQuery(getPvQuery(pv, dType),{pollInterval: pollInterval});
  const result = () => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    if (dType === "float") {
        return data.getChannel.value.float.toFixed(sigFigs);
    } else {
        return data.getChannel.value[dType]
    }
    
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
