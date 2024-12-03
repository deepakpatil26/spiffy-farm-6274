import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Logo from "../Asssets/logo2.png";

import { SignUpFunc } from "../redux/authReducer/action";

import axios from "axios";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userObj, setUserObj] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { successCreate, createError } = useSelector((state) => {
    return {
      successCreate: state.AuthReducer.successCreate,
      createError: state.AuthReducer.createError,
    };
  }, shallowEqual);

  useEffect(() => {
    if (successCreate) {
      toast({
        title: `Account Created Successfull`,
        status: "success",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [successCreate, toast, navigate]);

  useEffect(() => {
    if (createError) {
      toast({
        title: `Something Went Wrong !!!`,
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  }, [createError, toast]);

  function SignupRequest() {
    let checkAlready = false;

    userObj.length > 0 &&
      userObj.forEach((el) => {
        if (el.email === email) {
          checkAlready = true;
        }
      });

    if (!checkAlready) {
      dispatch(
        SignUpFunc({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
      );

      setEmail("");
      setPassword("");
      setfirstName("");
      setlastName("");
    } else {
      toast({
        title: `User already Signed up !!!`,
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    axios

      .get("https://lifestyle-mock-server-api.onrender.com/registeredUser")
      .then((response) => {
        setUserObj(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")}>
      <Image
        width="300px"
        height="70px"
        _hover={{ cursor: "pointer" }}
        src={Logo}
        onClick={() => navigate("/")}
      />
      <Flex
        minH={"80vh"}
        align={"center"}
        justify={"center"}
        backgroundImage={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf92GKTYc1k5BNpApxHinSFKnIXNU9wI9rWyibtoBH_bgmWuVBg5SFKoareRSb7jBlLFo&usqp=CAU"
        }
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading
              fontSize={"4xl"}
              textAlign={"center"}
              color={"saddlebrown "}
            >
              Sign up
            </Heading>

            <Text fontSize={"lg"} color={"gray.600"}>
              Welcome to OutFit Store ✌️
            </Text>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setfirstName(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setlastName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={SignupRequest}
                  loadingText="Submitting"
                  size="lg"
                  bg={"#df9018"}
                  color={"white"}
                  _hover={{
                    bg: "pink.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link color={"blue.400"} href="/login">
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}
