/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./Single.css";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Grid,
  useToast,
  Center,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import axios from "axios";
import Footer from "./Home/Footer";
import Navbar from "./Home/Navbar";

const Singlecardwomen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { women } = useSelector((store) => store.MenReducer);

  // Find the product
  const product = women.find((item) => item.id === id);

  // Handle missing product
  if (!product) {
    return (
      <>
        <Navbar />
        <Center h="50vh" flexDirection="column">
          <Text fontSize="xl" mb={4}>Product not found</Text>
          <Button colorScheme="blue" onClick={() => navigate("/women")}>
            Return to Women's Collection
          </Button>
        </Center>
        <Footer />
      </>
    );
  }

  const { actualPrice, type, image, price, title, discount } = product;

  const cartItem = {
    actualPrice,
    type,
    image,
    price,
    title,
    discount,
    quantity: 1,
  };

  const handleAdd = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(`https://lifestyle-mock-server-api.onrender.com/cart`, cartItem);
      toast({
        title: "Added to cart",
        description: "You can checkout from Cart",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      setError(error.message);
      toast({
        title: "Error adding to cart",
        description: error.message || "Please try again later",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <>
        <Navbar />
        <Center h="50vh" flexDirection="column">
          <Text fontSize="xl" color="red.500" mb={4}>{error}</Text>
          <Button colorScheme="blue" onClick={() => setError(null)}>
            Try Again
          </Button>
        </Center>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxW={"90%"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Grid
            rowGap={"-30px"}
            columnGap={"10px"}
            gridTemplateColumns={"auto auto"}
          >
            <Box className="img-hover-zoom">
              <Image
                className="hoverimage"
                rounded={"md"}
                alt={title}
                src={product.img1}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Box>
            <Box className="img-hover-zoom">
              <Image
                className="hoverimage"
                rounded={"md"}
                alt={title}
                src={product.img2}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Box>
            <Box className="img-hover-zoom">
              <Image
                className="hoverimage"
                rounded={"md"}
                alt={title}
                src={product.img3}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Box>
            <Box className="img-hover-zoom">
              <Image
                className="hoverimage"
                rounded={"md"}
                alt={title}
                src={product.img4}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Box>
          </Grid>

          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {title}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
              >
                ₹{price}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={"lg"}>
                  {type}
                </Text>
              </VStack>
            </Stack>

            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={"#ff8800"}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={handleAdd}
              isLoading={isLoading}
            >
              Add to cart
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <Footer />
    </>
  );
};

export default Singlecardwomen;
