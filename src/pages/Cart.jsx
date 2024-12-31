/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Flex,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Text,
  Heading,
  Image,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/cartReducer/action";
import axios from "axios";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";

const API_BASE_URL = "https://lifestyle-mock-server-api.onrender.com";

export const Cart = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { cartItems } = useSelector((store) => store.cartReducer);

  const showErrorToast = (message) => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`);
      dispatch(addToCart(response.data));
    } catch (error) {
      setError("Failed to fetch cart items");
      showErrorToast("Failed to load cart items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (item) => {
    const { id, title } = item;
    setIsLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/cart/${id}`);
      dispatch(removeFromCart(id));
      toast({
        title: "Item Removed",
        description: `${title} has been removed from your cart`,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      showErrorToast("Failed to remove item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (id, newQuantity, action) => {
    if (newQuantity < 1) return;
    setIsLoading(true);
    try {
      await axios.patch(`${API_BASE_URL}/cart/${id}`, {
        quantity: newQuantity,
      });
      if (action === 'increment') {
        dispatch(incrementQuantity(id));
      } else {
        dispatch(decrementQuantity(id));
      }
    } catch (error) {
      showErrorToast("Failed to update quantity. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleINC = (id, currentQuantity) => {
    updateQuantity(id, currentQuantity + 1, 'increment');
  };

  const handleDEC = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1, 'decrement');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getSavedAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + ((item.actualPrice - item.price) * item.quantity);
    }, 0);
  };

  if (isLoading && !cartItems.length) {
    return (
      <>
        <Navbar />
        <Center h="50vh">
          <Spinner size="xl" color="blue.500" />
        </Center>
        <Footer />
      </>
    );
  }

  if (error && !cartItems.length) {
    return (
      <>
        <Navbar />
        <Center h="50vh" flexDirection="column">
          <Text color="red.500" mb={4}>{error}</Text>
          <Button onClick={getData} colorScheme="blue">
            Try Again
          </Button>
        </Center>
        <Footer />
      </>
    );
  }

  if (!cartItems.length) {
    return (
      <>
        <Navbar />
        <Center h="50vh" flexDirection="column">
          <Text fontSize="xl" mb={4}>Your cart is empty</Text>
          <Button onClick={() => navigate("/")} colorScheme="blue">
            Continue Shopping
          </Button>
        </Center>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box p={4}>
        <Heading textAlign="center" mb={6}>Shopping Cart</Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Total</Th>
                <Th>Remove</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cartItems.map((item) => (
                <Tr key={item.id}>
                  <Td>
                    <Flex align="center">
                      <Image src={item.image} alt={item.title} boxSize="50px" objectFit="cover" mr={4} />
                      <Text>{item.title}</Text>
                    </Flex>
                  </Td>
                  <Td>₹{item.price}</Td>
                  <Td>
                    <Flex align="center">
                      <Button
                        size="sm"
                        onClick={() => handleDEC(item.id, item.quantity)}
                        isDisabled={item.quantity <= 1 || isLoading}
                      >
                        -
                      </Button>
                      <Text mx={2}>{item.quantity}</Text>
                      <Button
                        size="sm"
                        onClick={() => handleINC(item.id, item.quantity)}
                        isDisabled={isLoading}
                      >
                        +
                      </Button>
                    </Flex>
                  </Td>
                  <Td>₹{item.price * item.quantity}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(item)}
                      isDisabled={isLoading}
                    >
                      <CloseIcon />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Box mt={6} p={4} borderWidth={1} borderRadius="lg">
          <Flex justify="space-between" mb={4}>
            <Text>Subtotal:</Text>
            <Text>₹{getTotalPrice()}</Text>
          </Flex>
          <Flex justify="space-between" mb={4}>
            <Text>You Save:</Text>
            <Text color="green.500">₹{getSavedAmount()}</Text>
          </Flex>
          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={() => navigate("/checkout")}
            isDisabled={isLoading}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
};
