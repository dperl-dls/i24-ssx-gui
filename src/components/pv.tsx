import * as React from "react";
import { Box, Text, HStack, Button } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

const getPvQuery = (pv: string, type: string) =>
  gql(`
  query {
    getChannel(id: "${pv}") {
      value {
        ${type}
      }
    }
  }
`);

type PvProps = {
  label: string;
  pv: string;
  pollInterval?: number;
  sigFigs?: number;
  dType?: string;
};
type PvComponentProps = PvProps & { render: PvItemComponent };
type PvItem = { label: string; value: any };
type PvItemComponent = ({ label, value }: PvItem) => JSX.Element;

const PvComponent = (props: PvComponentProps) => {
  var dType = props.dType || "float";
  var sigFigs = props.dType || 4;
  const { loading, error, data } = useQuery(getPvQuery(props.pv, dType), {
    pollInterval: props.pollInterval,
  });
  const result = () => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    if (dType === "float") {
      return data.getChannel.value.float.toFixed(sigFigs);
    } else {
      return data.getChannel.value[dType];
    }
  };
  return props.render({ label: props.label, value: result() });
};

export const PollingRoPvBox = (props: PvProps) => {
  console.log(props.label);
  return PvComponent({
    ...props,
    render: (props: PvItem) => (
      <HStack spacing={2}>
        <Box borderWidth={1} padding={1}>
          <Text>{props.label}:</Text>
        </Box>
        <Box borderWidth={1} padding={1}>
          <Text>{props.value}</Text>
        </Box>
      </HStack>
    ),
  });
};

export const OnOffPvButtons = (props: PvProps & {colormap: (value: any) => string}) => {
  let colormap = props.colormap
  return PvComponent({
    ...props,
    render: (props: PvItem) => (
      <HStack spacing={2}>
        <Box borderWidth={1} padding={1}>
          <Text>{props.label}:</Text>
        </Box>
        <Box borderWidth={1} padding={1}>
          <Button color={colormap(props.value)}>{props.value}</Button>
        </Box>
      </HStack>
    ),
  });
};
