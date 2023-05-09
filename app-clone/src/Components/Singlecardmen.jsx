import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Single.css";
import axios from "axios";
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
  List,
  ListItem,
  Grid,
  useToast,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import Footer from "./Home/Footer";
import Navbar from "./Home/Navbar";

const Singlecardmen = () => {
  const { id } = useParams();
  console.log(+id - 1);
  const toast = useToast();
  const { men } = useSelector((store) => {
    return store.MenReducer;
  });
  const [el] = men.filter((el) => {
    return el.id === id;
  });
  let { actualPrice, type, image, price, title, discount } = el;
  let obj = {
    actualPrice,
    type,
    image,
    price,
    title,
    discount,
    quantity: 1,
  };
  console.log(el);
  const handleAdd = () => {
    axios
      .post(`https://lifestyle-mock-server-api.onrender.com/cart`, obj)
      .then((res) => {
        toast({
          title: "Added to cart",
          description: "You can checkout from Cart",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                alt={"product image"}
                src={el.img1}
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
                alt={"product image"}
                src={el.img2}
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
                alt={"product image"}
                src={el.img3}
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
                alt={"product image"}
                src={el.img4}
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
                {el.title}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
              >
                ${el.price} USD Inclusive of all taxes
              </Text>
              <Text
                as="del"
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"xl"}
              >
                ${el.actualPrice}
              </Text>{" "}
              <span>Save ₹ 1500 (50.02%)</span>
              <Text />
              <Text color={"#ff8800"} fontWeight={300}>
                ★★★★☆
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
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={"2xl"}
                  fontWeight={"300"}
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore
                </Text>
                <Text fontSize={"lg"}>
                  Keep your look simple yet stylish by wearing this graceful
                  perky A-line piece designed with embroidery on the surface.
                  The outfit boasts a round neck, three-quarter sleeves, and a
                  curved hemline. Style with a pair of jhumkas and bangles and
                  you are good to go.
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Features
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Embroidered</ListItem>
                    <ListItem>Hand wash only</ListItem>{" "}
                    <ListItem>Pure Cotton</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>Kurta</ListItem>
                    <ListItem>Round Neck</ListItem>
                    <ListItem>Casual</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Product Details
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Net Quantity:
                    </Text>{" "}
                    1
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Occasion:
                    </Text>{" "}
                    Casual
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Product:
                    </Text>{" "}
                    Kurta
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Design:
                    </Text>{" "}
                    Embroidered
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Fabric:
                    </Text>{" "}
                    Cotton
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Model Wears:
                    </Text>{" "}
                    Size S, has Height 5'7",Chest 33",and Waist 28"
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Country of Origin:
                    </Text>{" "}
                    India
                  </ListItem>
                </List>
              </Box>
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

export default Singlecardmen;
