import React from "react";
import { Box, Divider, Flex } from "@chakra-ui/react";
import {
  MdOutlineLocalShipping,
  MdOutlineAddToHomeScreen,
} from "react-icons/md";
import { FaHome } from "react-icons/fa";

const NavbarTop = () => {
  return (
    <Box bg={"black"} paddingTop={2} paddingBottom={2}>
      <Flex
        width="80%"
        margin="auto"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Flex justifyContent={"space-around"} width="55%" alignItems="center">
          <Flex _hover={{ cursor: "pointer" }}>
            <MdOutlineLocalShipping fontSize={"20px"} color="white" />
            <Box
              className="topnavoffer"
              fontFamily="sans-serif"
              color={"white"}
              fontWeight="500"
              fontSize="15px"
              pl="13px"
            >
              Free shipping
            </Box>
          </Flex>

          <Flex _hover={{ cursor: "pointer" }}>
            <MdOutlineAddToHomeScreen fontSize={"20px"} color="white" />
            <Box
              className="topnavoffer"
              fontFamily="sans-serif"
              color={"white"}
              fontWeight="500"
              fontSize="15px"
              pl="13px"
            >
              Click & Collect
            </Box>
          </Flex>

          <Flex _hover={{ cursor: "pointer" }}>
            <FaHome fontSize={"20px"} color="white" />
            <Box
              className="topnavoffer"
              fontFamily="sans-serif"
              color={"white"}
              fontWeight="500"
              fontSize="15px"
              pl="13px"
            >
              Return To Store
            </Box>
          </Flex>
        </Flex>

        <Flex justifyContent={"space-evenly"} width="35%" alignItems="center">
          <Box _hover={{ cursor: "pointer" }}>
            <Box
              className="topnavoffer"
              fontFamily="sans-serif"
              color={"white"}
              fontWeight="500"
              fontSize="13px"
              pl="13px"
            >
              Download Our App
            </Box>
          </Box>

          <Divider h="15px" orientation="vertical" />

          <Box _hover={{ cursor: "pointer" }}>
            <Box
              className="topnavoffer"
              fontFamily="sans-serif"
              color={"white"}
              fontWeight="500"
              fontSize="13px"
              pl="13px"
            >
              Store Locator
            </Box>
          </Box>

          <Divider h="15px" orientation="vertical" />

          <Box _hover={{ cursor: "pointer" }}>
            <Box
              className="topnavoffer"
              fontFamily="sans-serif"
              color={"white"}
              fontWeight="500"
              fontSize="13px"
              pl="13px"
            >
              Help
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
export default NavbarTop;
