import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Nav from "./Nav";

export default function ProtectedLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      navigate("/auth");
    } else {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, navigate]);

  return (
    <Box>
      <Nav authenticated={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Outlet />
      </Flex>
    </Box>
  );
}
