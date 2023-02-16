import React, { useEffect, useState } from "react";

import axios from "../util/axios";

import { Stack, Heading, Spinner } from "@chakra-ui/react";
import NameList from "./NameList";

const Favorites = () => {
  const [fetching, setFetching] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      setFetching(true);
      try {
        const { data } = await axios.get(`/curr_user`);
        setFavorites(data.name_ranking.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
      setFetching(false);
    };

    fetchFavorites();
  }, []);

  return (
    <Stack
      mx={"auto"}
      textAlign={"center"}
      maxW={"lg"}
      minH={"xl"}
      mt={[0, 4, 8]}
      p={6}
      spacing={[4, 8]}
    >
      <Heading fontSize={["2xl", "3xl"]} color={"gray.800"}>
        Your Favorite Names
      </Heading>
      {fetching ? <Spinner /> : <NameList names={favorites} />}
    </Stack>
  );
};

export default Favorites;
