import React from "react";

import { Text, Square } from "@chakra-ui/react";

const NameCard = ({ name, onClick }) => {
  return (
    <Square
      background="teal.500"
      color="white"
      border="white 3px solid"
      boxShadow={"lg"}
      width={[32, 48, 64]}
      h={[36, 56, 64]}
      p={["2", "8"]}
      rounded={"lg"}
      onClick={() => onClick(name)}
      _hover={{
        cursor: "pointer",
        background: "teal.400",
        transform: "scale(1.05)",
      }}
    >
      <Text fontSize={["xl", "3xl", "4xl"]}>{name}</Text>
    </Square>
  );
};

export default NameCard;
