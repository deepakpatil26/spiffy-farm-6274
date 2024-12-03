import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

function SearchBar() {
  return (
    <Box borderRadius={"md"} pos="relative">
      <InputGroup>
        <InputLeftElement children={<BsSearch color="gray.300" />} />
        <Input
          type="text"
          outline="none"
          placeholder="What are you looking for?"
          backgroundColor={"#ffffff"}
          _focus={{
            boxShadow: "none",
            border: "1px solid #f89f17",
            outline: "none",
          }}
        />
      </InputGroup>
    </Box>
  );
}

export default SearchBar;
