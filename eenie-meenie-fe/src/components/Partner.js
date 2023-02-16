import React, { useEffect, useState } from "react";

import axios from "../util/axios";

import { Stack, Heading, Spinner, Flex } from "@chakra-ui/react";
import NameList from "./NameList";
import SelectPartner from "./SelectPartner";

const Partner = () => {
  const [fetching, setFetching] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [users, setUsers] = useState([]);
  const [partner, setPartner] = useState(null);

  const selectPartner = async (partnerId) => {
    console.log(partnerId);
    const { data } = await axios.post("/partner", { partner_id: partnerId });
    setPartner(data);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      setFetching(true);
      try {
        const { partner, name_ranking } = (await axios.get("/curr_user")).data;
        setFavorites(name_ranking);
        const { data } = await axios.get("/users");
        setUsers(data);

        if (partner) {
          const { data } = await axios.get(`/user/${partner}`);
          setPartner(data);
        }
      } catch (error) {
        console.log(error);
      }
      setFetching(false);
    };

    fetchFavorites();
  }, []);

  if (!partner) {
    return (
      <Stack mx={"auto"} maxW={"lg"} minH={"xl"} mt={"8"} p={6} spacing={8}>
        <Heading fontSize={"3xl"}>No Partner Selected</Heading>
        <SelectPartner users={users} onChange={selectPartner} />
      </Stack>
    );
  }

  return (
    <Stack mx={"auto"} maxW={"lg"} minH={"xl"} p={6} align="center" spacing={8}>
      <SelectPartner users={users} onChange={selectPartner} />
      <Flex gap={[2, 4, 16]} direction={["column", "row"]} textAlign={"center"}>
        <Stack>
          <Heading fontSize={"2xl"} whiteSpace={"nowrap"} color={"gray.800"}>
            {partner.username}'s favorites
          </Heading>
          {fetching ? (
            <Spinner />
          ) : (
            <NameList names={partner.name_ranking.slice(0, 10)} />
          )}
        </Stack>
        <Stack>
          <Heading fontSize={"2xl"} color={"gray.800"}>
            You both love...
          </Heading>
          <NameList
            names={partner.name_ranking
              .filter((name) => favorites.includes(name))
              .slice(0, 10)}
            color={"purple.500"}
          />
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Partner;
