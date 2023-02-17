import React from "react";

import { Stack, Text, Flex, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const NameList = ({ names, color = "teal.500", onClick }) => {
  return (
    <Stack align="center" spacing={2} fontSize={"lg"}>
      {names.length ? (
        names.map((name) => (
          <Flex align={"center"} gap={2} key={name}>
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
            >
              {name}
            </Text>
            {onClick ? (
              <IconButton
                variant={"ghost"}
                colorScheme="red"
                size="lg"
                icon={<DeleteIcon />}
                onClick={() => onClick(name)}
              ></IconButton>
            ) : null}
          </Flex>
        ))
      ) : (
        <Text whiteSpace={"nowrap"}>No names ranked yet</Text>
      )}
    </Stack>
  );
};

export default NameList;
