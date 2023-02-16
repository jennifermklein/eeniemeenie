import React, { useEffect, useState } from "react";

import axios from "../util/axios";

import { Stack, Heading, Spinner, Select } from "@chakra-ui/react";
import NameList from "./NameList";

const Partner = () => {
  const [fetching, setFetching] = useState(false);
  const [users, setUsers] = useState([]);
  const [partner, setPartner] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const selectPartner = async (partnerId) => {
    console.log(partnerId);
    const { data } = await axios.post("/partner", { partner_id: partnerId });
    setPartner(data);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      setFetching(true);
      try {
        const { data } = await axios.get("/curr_user");
        const { partner } = data;

        if (partner) {
          // fetch partner
          const { data } = await axios.get(`/user/${partner}`);
          setPartner(data);
          setFavorites(data.name_ranking.slice(0, 10));
        } else {
          // else fetch all users to select from
          const { data } = await axios.get("/users");
          setUsers(data);
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
      <Stack
        mx={"auto"}
        maxW={"lg"}
        minH={"xl"}
        p={6}
        align="center"
        spacing={8}
      >
        <Heading fontSize={"3xl"}>No Partner Selected</Heading>
        {/* select from list of users */}
        <Select
          placeholder="Select partner"
          size="lg"
          variant="filled"
          borderColor={"teal"}
          bg={"white"}
          onChange={(e) => selectPartner(e.target.value)}
        >
          {users.map((user) => (
            <option key={user.username} value={user.id}>
              {user.username}
            </option>
          ))}
        </Select>
      </Stack>
    );
  }

  return (
    <Stack mx={"auto"} maxW={"lg"} minH={"xl"} p={6} align="center" spacing={8}>
      <Heading fontSize={"3xl"}>Your Partner's Favorite Names</Heading>
      {fetching ? <Spinner /> : <NameList names={favorites} />}
    </Stack>
  );
};

export default Partner;
