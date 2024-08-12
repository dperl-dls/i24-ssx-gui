import * as React from "react";
import { Box, Text, HStack, Button } from "@chakra-ui/react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

const GET_PV_QUERY = gql`
  query ReadPv($id: ID!) {
    getChannel(id: $id) {
      value {
        string
      }
    }
  }
`;

const SET_PV_QUERY = gql`
  mutation SetPv($ids: [ID!]!, $values: [String!]!) {
    putChannels(ids: $ids, values: $values) {
      value {
        string
      }
    }
  }
`;

export enum PvDTypes {
  Float,
  Int,
  String,
}

type ReadPvProps = {
  pv: string;
  label: string;
  pollInterval?: number;
  sigFigs?: number;
  dType?: PvDTypes;
};
type ReadPvComponentProps = ReadPvProps & { render: PvItemComponent };

type SetPvProps = {
  action_label: string;
  modifyNumber?: (current: number) => number;
  set_pv?: string;
} & ReadPvProps;

type PvItem = { label: string; value: any };
type PvItemComponent = ({ label, value }: PvItem) => JSX.Element;

const parseResult = (value: string, dType: PvDTypes, sigFigs?: number) => {
  switch (dType) {
    case PvDTypes.Float: {
      return sigFigs ? parseFloat(value).toFixed(sigFigs) : parseFloat(value);
    }
    case PvDTypes.Int: {
      return parseInt(value);
    }
    case PvDTypes.String: {
      return value;
    }
  }
};

const PvComponent = (props: ReadPvComponentProps) => {
  const { loading, error, data } = useQuery(GET_PV_QUERY, {
    variables: { id: props.pv },
    pollInterval: props.pollInterval || 100,
  });
  const result = () => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    let rawResult: string = data.getChannel.value.string;
    return props.dType ? parseResult(rawResult, props.dType, props.sigFigs) : rawResult;
  };
  return props.render({ label: props.label, value: result() });
};

export const PollingRoPvBox = (props: ReadPvProps) => {
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

export const OnOffPvButton = (props: ReadPvProps & { colormap: (value: any) => string }) => {
  let colormap = props.colormap;
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


// TODO: make this use a context for the current value
export const SetPvButton = (props: SetPvProps) => {
  let modifyNumber = props.modifyNumber || ((x) => x);
  const reading = useQuery(GET_PV_QUERY, {
    variables: { id: props.pv },
    pollInterval: props.pollInterval || 100,
  });
  let current = (() => {
    if (reading.loading) return 0;
    if (reading.error) return 0;
    return parseFloat(reading.data.getChannel.value.string)
  })()
  const [setPv, { loading, error, data }] = useMutation(SET_PV_QUERY, {
    variables: { ids: [props.set_pv || props.pv], values: [modifyNumber(current).toString()] },
  });
  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>{`Error! ${error}`}</Box>;
  return <Button onClick={(e) => setPv()}>{props.action_label}</Button>;
};
