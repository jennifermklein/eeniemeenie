import React from "react";

import { Text, Square } from "@chakra-ui/react";

const NameCard = ({ name, onClick }) => {
  return (
    <Square
      background="teal.400"
      color="yellow.50"
      border="white 3px solid"
      boxShadow={"lg"}
      width={[32, 48, 56]}
      h={[36, 56, 64]}
      p={["2", "8"]}
      rounded={"lg"}
      fontFamily="mono"
      onClick={() => onClick(name)}
      _hover={{
        cursor: "pointer",
        background: "teal.300",
        transform: "scale(1.05)",
      }}
    >
      <Text fontSize={["xl", "3xl", "4xl"]}>{name}</Text>
    </Square>
  );
};

export default NameCard;
