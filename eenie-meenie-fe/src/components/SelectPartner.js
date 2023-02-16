import React from "react";

import { Select } from "@chakra-ui/react";

const SelectPartner = ({ users, onChange }) => {
  return (
    <Select
      placeholder="Select partner"
      size="lg"
      variant="filled"
      borderColor={"teal.600"}
      bg={"white"}
      onChange={(e) => onChange(e.target.value)}
    >
      {users.map((user) => (
        <option key={user.username} value={user.id}>
          {user.username}
        </option>
      ))}
    </Select>
  );
};

export default SelectPartner;
