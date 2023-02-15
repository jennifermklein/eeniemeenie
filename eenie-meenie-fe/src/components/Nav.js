import React from "react";
import { Link } from "react-router-dom";

import { Text, Flex } from "@chakra-ui/react";

const Nav = ({ authenticated, setIsLoggedIn }) => {
  return (
    <Flex
      minH={"10vh"}
      align={"center"}
      justify={{ base: "space-evenly", sm: "space-between" }}
      bg={"white"}
      py={2}
      px={6}
      direction={{ base: "column", md: "row" }}
      background="purple.300"
    >
      <Flex direction={"column"} fontWeight={"bold"}>
        <Text maxH={["1rem", "1.5rem"]} fontSize={["xl", "2xl", "3xl"]}>
          Eenie
        </Text>
        <Text ml={[3, 5, 8]} fontSize={["xl", "2xl", "3xl"]}>
          Meenie
        </Text>
      </Flex>
      {authenticated && (
        <Flex direction={["column", "row"]} align={"center"} gap={[1, 6]}>
          <Link to={"/"}>Play</Link>
          <Link to={"/favorites"}>Favorites</Link>
          <Link to={"/partner"}>Partner</Link>
          <Link to={"/settings"}>Settings</Link>
          <Text
            as={"button"}
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}
          >
            Log out
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Nav;
