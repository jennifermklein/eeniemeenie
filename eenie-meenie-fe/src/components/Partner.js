import React, { useEffect, useState } from "react";

import axios from "../util/axios";

import { Stack, Heading, Spinner, Text, Select } from "@chakra-ui/react";

const Partner = () => {
  const [fetching, setFetching] = useState(false);
  const [currUser, setCurrUser] = useState("");
  const [users, setUsers] = useState([]);
  const [partner, setPartner] = useState(null);

  const selectPartner = (partner) => {
    // post request to set partner
    // fetch partner's favorite names
    console.log(partner);
    // setPartner("test");
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      setFetching(true);
      try {
        const { data } = await axios.get("/user");
        setCurrUser(data.username);
        if (data.partner) {
          // fetch partner's name and favorites
        } else {
          // fetch all users
          const { data } = await axios.get("/users");
          setUsers(data);
          // to do: exclude current user
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
