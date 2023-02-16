import React, { useEffect, useState } from "react";

import axios from "../util/axios";

import { Stack, Heading, Spinner } from "@chakra-ui/react";
import NameList from "./NameList";
import SelectPartner from "./SelectPartner";

const Partner = () => {
  const [fetching, setFetching] = useState(false);
  const [users, setUsers] = useState([]);
  const [partner, setPartner] = useState(null);
  // const [favorites, setFavorites] = useState([]);

  const selectPartner = async (partnerId) => {
    console.log(partnerId);
    const { data } = await axios.post("/partner", { partner_id: partnerId });
    setPartner(data);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      setFetching(true);
      try {
        const { partner } = (await axios.get("/curr_user")).data;
        const { data } = await axios.get("/users");
        setUsers(data);

        if (partner) {
          const { data } = await axios.get(`/user/${partner}`);
          setPartner(data);
          // setFavorites(data.name_ranking.slice(0, 10));
        }
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
      <Heading fontSize={"3xl"}>{partner.username}'s Favorite Names</Heading>
      {fetching ? (
        <Spinner />
      ) : (
        <NameList names={partner.name_ranking.slice(0, 10)} />
      )}
    </Stack>
  );
};

export default Partner;
