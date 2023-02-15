import { useRouteError } from "react-router-dom";

import { Heading, Flex, useColorModeValue, Text } from "@chakra-ui/react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      direction={"column"}
      bg={useColorModeValue("gray.50", "gray.800")}
      id="error-page"
    >
      <Heading as={"h1"} textAlign={"center"}>
        Oops!
      </Heading>
      <Text fontSize={"14pt"}>Sorry, an unexpected error has occurred.</Text>
      <Text fontSize={"14pt"} fontStyle={"italic"}>
        {error.statusText || error.message}
      </Text>
    </Flex>
  );
}
