import React from "react";

import { Text, Square } from "@chakra-ui/react";

const NameCard = ({ name, onClick }) => {
  return (
    <Square
      background="teal.400"
      color="yellow.200"
      border="white 3px solid"
      width={[32, 36, 48]}
      h={[28, 36, 48]}
      p={["2", "8"]}
      rounded={"lg"}
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
