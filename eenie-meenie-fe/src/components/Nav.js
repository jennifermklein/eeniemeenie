import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Text, Flex } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

import axios from "../util/axios";

const Nav = ({ authenticated, setIsLoggedIn }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/curr_user`);
        setUsername(data.username);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [authenticated]);

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
      <Flex align="center" gap={[0, 3, 6]} direction={["column", "row"]}>
        <Flex
          direction={"column"}
          fontWeight={"bold"}
          color="teal.900"
          fontFamily={"monospace"}
        >
          <Text maxH={["1rem", "1.5rem"]} fontSize={["xl", "2xl", "3xl"]}>
            Eenie
          </Text>
          <Text ml={[3, 5, 8]} fontSize={["xl", "2xl", "3xl"]}>
            Meenie
          </Text>
        </Flex>
        <Text
          fontWeight={"bold"}
          fontSize={["md", "lg", "xl"]}
          color="yellow.50"
        >
          {username}
        </Text>
      </Flex>
      {authenticated && (
        <Flex
          direction={["column", "row"]}
          align={"center"}
          gap={[0, 2, 6]}
          fontSize={["sm", "md", "lg"]}
          fontWeight={"normal"}
        >
          <Link to={"/"}>Play</Link>
          <Link to={"/favorites"}>Favorites</Link>
          <Link to={"/partner"}>Partner</Link>
          <Link to={"/settings"}>
            <SettingsIcon />
          </Link>
          <Text
            as={"button"}
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
              setUsername();
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
