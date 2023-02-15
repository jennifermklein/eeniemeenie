import React, { useEffect, useState } from "react";

import axios from "../util/axios";

import { Stack, Heading, Spinner, Text } from "@chakra-ui/react";

const Favorites = () => {
  const [fetching, setFetching] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      setFetching(true);
      try {
        const { data } = await axios.get(`/user`);
        setFavorites(data.name_ranking.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
      setFetching(false);
    };

    fetchFavorites();
  }, []);

  if (fetching) {
    return <Spinner />;
  }

  return (
    <Stack mx={"auto"} maxW={"lg"} minH={"xl"} p={6} align="center" spacing={8}>
      <Heading fontSize={"3xl"}>Your Favorite Names</Heading>
      <Stack align="center" spacing={4} fontSize={"lg"}>
        {favorites.length ? (
          favorites.map((name) => <Text key={name}>{name}</Text>)
        ) : (
          <Text>No favorites yet</Text>
        )}
      </Stack>
    </Stack>
  );
};

export default Favorites;
