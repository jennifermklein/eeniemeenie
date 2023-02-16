import React from "react";

import { Stack, Text } from "@chakra-ui/react";

const NameList = ({ names, color = "teal.500" }) => {
  return (
    <Stack align="center" spacing={2} fontSize={"lg"}>
      {names.length ? (
        names.map((name) => (
          <Text
            fontSize={["lg", "xl", "2xl"]}
            color="white"
            fontWeight="medium"
            boxShadow={"md"}
            border={"2px solid white"}
            paddingY={2}
            paddingX={5}
            minW={["48", "64", "xs"]}
            rounded="lg"
            bg={color}
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
