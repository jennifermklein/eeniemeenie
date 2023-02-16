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
    <Stack mx={"auto"} maxW={"lg"} minH={"xl"} p={6} align="center" spacing={8}>
      <Heading fontSize={"3xl"}>Your Favorite Names</Heading>
      {fetching ? <Spinner /> : <NameList names={favorites} />}
    </Stack>
  );
};

export default Favorites;
