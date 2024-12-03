import {
  Box,
  Flex,
  Image,
  Popover,
  Text,
  MenuGroup,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
  useToast,
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import { BsBag, BsPerson } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import Logo from "../../Asssets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import HomeMenu from "./HomeMenu";
import SearchBar from "./SearchBar";
import SideBar from "./Sidebar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authReducer/action";
import axios from "axios";
import { addToCart } from "../../redux/cartReducer/action";
// import NavbarTop from "./NavbarTop";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  let { isAuth, afterLoginUser } = useSelector((state) => state.AuthReducer);
  const { cartItems } = useSelector((store) => store.cartReducer);

  useEffect(() => {
    axios
      .get(`https://lifestyle-mock-server-api.onrender.com/cart`)
      .then((res) => {
        dispatch(addToCart(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cartItems]);
  return (
    <Box
      position={"sticky"}
      top="0"
      zIndex={"100"}
      bg="#f7f8f7"
      width="100%"
      boxShadow=" 0px 7px 7px -5px rgba(170, 159, 170, 0.2)"
    >
      {/* <Box display={{ base: "none", sm: "none", md: "none", lg: "block" }}>
                <NavbarTop />
            </Box> */}

      <Flex
        height={{ base: "3.2rem", md: "4.94rem" }}
        px={{ base: "1rem", md: "3rem" }}
        justify={"space-between"}
        gap={{ base: "0.5rem", sm: "1rem", md: "2rem", lg: "2rem" }}
        align={"center"}
        width="90%"
        margin="auto"
      >
        <Box display={{ lg: "none" }}>
          <SideBar />
        </Box>

        <Link to="/">
          <Box minW={"6rem"}>
            <Image
              src={Logo}
              alt="logo"
              margin={"auto"}
              width={{ base: "90%", sm: "60%", md: "60%", lg: "100%" }}
              height={{ base: "2rem", md: "100%" }}
            />
          </Box>
        </Link>

        <Box
          minWidth={"30%"}
          width="90%"
          display={{ base: "none", lg: "block" }}
        >
          <HomeMenu />
        </Box>

        <Box
          minWidth={"30%"}
          width="90%"
          display={{ base: "none", lg: "block" }}
        >
          <SearchBar />
        </Box>

        <Flex gap={{ base: "0.5rem", md: "1.5rem" }} align="center">
          <Popover>
            <Menu>
              <MenuButton>
                <BsPerson fontSize={"1.3rem"} />
              </MenuButton>

              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem color="pink.400">
                    Hey,{isAuth ? `${afterLoginUser.name}` : "User"}
                  </MenuItem>
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Order History</MenuItem>
                  <MenuItem>My Address</MenuItem>
                  <MenuItem>Payments</MenuItem>
                  <MenuItem>Reviews</MenuItem>
                  <MenuItem onClick={() => navigate("/adminLogin")}>
                    Admin
                  </MenuItem>
                </MenuGroup>

                {isAuth === true ? (
                  <MenuItem
                    _hover={{ backgroundColor: "pink" }}
                    backgroundColor="#fdb852"
                    onClick={() => {
                      dispatch(logout);
                      toast({
                        title: "User Logout Successfully.",
                        description: "Come Back Again Soon",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        position: "top",
                      });
                    }}
                  >
                    Sign Out
                  </MenuItem>
                ) : (
                  <MenuItem
                    _hover={{ backgroundColor: "pink" }}
                    backgroundColor="#fdb852"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Sign Up
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Popover>
          <Link to="#">
            <Flex flexDir={"column"} align={"center"}>
              <Text>
                <AiOutlineHeart fontSize={"1.3rem"} />
              </Text>
            </Flex>
          </Link>

          <Link to="/cart">
            <Flex flexDir={"column"} align={"center"} pos="relative">
              <Text>
                <BsBag fontSize={"1.3rem"} />
              </Text>
              <Box
                justify={"center"}
                align="center"
                pos={"absolute"}
                top="-5px"
                right="-12px"
                width="20px"
                height="20px"
                color="white"
                borderRadius={"50%"}
                bg="#d53f8c"
              >
                <Text> {cartItems.length}</Text>
              </Box>
            </Flex>
          </Link>
        </Flex>
      </Flex>

      <Box padding={"8px"} display={{ lg: "none" }} width="90%" margin="auto">
        <SearchBar />
      </Box>
    </Box>
  );
};

export default Navbar;
