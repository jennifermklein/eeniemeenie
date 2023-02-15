import React, { useEffect, useState } from "react";

// import axios from "../util/axios";

import { Stack, Heading, Spinner } from "@chakra-ui/react";

const Partner = () => {
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setFetching(true);
      try {
        // set up endpoint to fetch user's partner and favorites
        // if no partner, allow user to choose partner
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
      <Heading fontSize={"3xl"}>Your Partner</Heading>
      <Stack align="center" spacing={4} fontSize={"lg"}>
        {/* {favorites.length ? (
          favorites.map((name) => <Text key={name}>{name}</Text>)
        ) : (
          <Text>No favorites yet</Text>
        )} */}
      </Stack>
    </Stack>
  );
};

export default Partner;
