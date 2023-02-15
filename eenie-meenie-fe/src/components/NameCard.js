import React from "react";

import { Text, Square } from "@chakra-ui/react";

const NameCard = ({ name, onClick }) => {
  return (
    <Square
      background="teal.500"
      color="gray.100"
      minW={[24, 36, 48]}
      h={[28, 36]}
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
