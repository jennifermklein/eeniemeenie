import React from "react";

import { Stack, Text } from "@chakra-ui/react";

const NameList = ({ names }) => {
  return (
    <Stack align="center" spacing={4} fontSize={"lg"}>
      {names.length ? (
        names.map((name) => (
          <Text
            fontSize={"2xl"}
            color={"teal.600"}
            border={"2px solid white"}
            paddingY={2}
            paddingX={5}
            minW={"xs"}
            rounded={"lg"}
            bg={"yellow.300"}
            key={name}
          >
            {name}
          </Text>
        ))
      ) : (
        <Text>No names ranked yet</Text>
      )}
    </Stack>
  );
};

export default NameList;
