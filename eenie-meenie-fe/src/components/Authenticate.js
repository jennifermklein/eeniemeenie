import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../util/axios";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function AuthenticateCard() {
  const navigate = useNavigate();

  const [registerMode, setRegisterMode] = useState(false);
  const [message, setMessage] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const authenticate = async (callback) => {
    try {
      const { data } = await callback();

      const token = data.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        setMessage(data);
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const login = () => axios.post(`/login`, { username, password });

  const register = () => axios.post(`/register`, { username, email, password });

  const title = registerMode ? "Sign up" : "Sign in";

  return (
    <Stack
      spacing={8}
      mx={"auto"}
      minW={["xs", "sm", "md", "lg"]}
      py={[3, 12]}
      px={[3, 6]}
    >
      <Stack align={"center"}>
        <Heading fontSize={["2xl", "4xl"]} textAlign={"center"}>
          {title}
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={[4, 8]}
      >
        <Stack spacing={[1, 4]}>
          <Text>{message}</Text>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl
            id="email"
            isRequired
            display={registerMode ? "block" : "none"}
          >
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl
            id="password"
            isRequired
            onChange={(e) => setPassword(e.target.value)}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? "text" : "password"} />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={5} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              colorScheme={"purple"}
              onClick={() => authenticate(registerMode ? register : login)}
            >
              {title}
            </Button>
            <Stack pt={0}>
              <Text align={"center"}>
                {registerMode
                  ? "Already a user? "
                  : "Don't have an account yet? "}
                <Text
                  as={"button"}
                  color={"purple.400"}
                  onClick={() =>
                    setRegisterMode((registerMode) => !registerMode)
                  }
                >
                  {registerMode ? "Sign in" : "Sign up"}
                </Text>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
