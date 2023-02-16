import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../util/axios";

import { Stack, Flex, Heading } from "@chakra-ui/react";

import NameCard from "./NameCard";

const Play = () => {
  const navigate = useNavigate();

  const [fetching, setFetching] = useState(false);
  const [choices, setChoices] = useState([]);

  // if user hasn't yet picked settings, redirect
  // otherwise start playing
  useEffect(() => {
    const fetchSettings = async () => {
      setFetching(true);
      try {
        const { data } = await axios.get(`/settings`);
        if (!data.set) {
          navigate("/settings");
        } else {
          // request 2 random names from user's pool
          const { data } = await axios.get("/choices");
          setChoices(data);
        }
      } catch (error) {
        console.log(error);
      }
      setFetching(false);
    };

    fetchSettings();
  }, []);

  const choose = async (name) => {
    setFetching(true);

    // get new choices
    try {
      const { data } = await axios.get("/choices");
      setChoices(data);
    } catch (error) {
      console.log(error);
    }
    setFetching(false);

    // update ranking
    try {
      await axios.post("/rank", {
        name1: name,
        name2: name === choices[0] ? choices[1] : choices[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      mx={"auto"}
      maxW={"lg"}
      minH={"xl"}
      p={6}
      align="center"
      spacing={10}
    >
      <Heading fontSize={["2xl", "3xl"]}>Choose your favorite name</Heading>
      <Flex mx={"auto"} gap={[2, 4]} align={"center"} justifyContent={"center"}>
        <NameCard name={choices[0]} onClick={choose} />
        <NameCard name={choices[1]} onClick={choose} />
      </Flex>
    </Stack>
  );
};

export default Play;
