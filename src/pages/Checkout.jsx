import React, { useState, memo } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  useToast,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initialState = {
  name: "",
  mobile: "",
  pin: "",
  city: "",
  state: "",
  building: "",
};

const validateForm = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }

  if (!values.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!/^[6-9]\d{9}$/.test(values.mobile)) {
    errors.mobile = "Please enter a valid 10-digit mobile number";
  }

  if (!values.pin) {
    errors.pin = "PIN code is required";
  } else if (!/^\d{6}$/.test(values.pin)) {
    errors.pin = "Please enter a valid 6-digit PIN code";
  }

  if (!values.city.trim()) {
    errors.city = "City is required";
  }

  if (!values.state.trim()) {
    errors.state = "State is required";
  }

  if (!values.building.trim()) {
    errors.building = "Building/Street details are required";
  }

  return errors;
};

function Checkout() {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState(initialState);
  const [shippingAddress, setShippingAddress] = useState(null);

  const { cartItems } = useSelector((store) => store.cartReducer);

  const calculateSavings = memo(() => {
    return cartItems.reduce((total, item) => {
      const originalPrice = item.price;
      const discountedPrice = item.price - (10 * item.price) / 100;
      return total + ((originalPrice - discountedPrice) * item.quantity);
    }, 0);
  });

  const getTotalPrice = memo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formErrors = validateForm(address);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setShippingAddress(address);
      setAddress(initialState);

      toast({
        title: "Address Added",
        description: "Your shipping address has been saved successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save address. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToPayment = () => {
    if (!cartItems.length) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before proceeding to payment",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/");
      return;
    }

    navigate("/payment");
  };

  if (!cartItems.length) {
    return (
      <>
        <Navbar />
        <Box p={4}>
          <Alert status="warning">
            <AlertIcon />
            <AlertTitle>Cart is Empty!</AlertTitle>
            <AlertDescription>
              Please add items to your cart before proceeding to checkout.
              <Button ml={4} colorScheme="blue" onClick={() => navigate("/")}>
                Continue Shopping
              </Button>
            </AlertDescription>
          </Alert>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <Box>
      <Navbar />

      <Box width={{ base: "90%", sm: "90%", md: "90%", lg: "80%" }} margin="auto">
        <Box pt={"20px"} pb="20px">
          <Text color={"gray.600"} fontSize={"24px"}>
            Checkout & Shipping
          </Text>
        </Box>

        <Flex
          gap={20}
          flexDirection={{
            base: "column-reverse",
            sm: "column-reverse",
            md: "row",
            lg: "row",
          }}
          justifyContent="center"
          marginBottom={"30px"}
        >
          {/* Address Form */}
          <Box
            border="1px solid #bab8b4"
            padding={"20px"}
            width={{ base: "100%", sm: "100%", md: "60%", lg: "60%" }}
          >
            <Box textAlign={"center"}>
              <Text textAlign={"center"} color={"black"} fontSize={"22px"}>
                Home Delivery
              </Text>
              <Text fontSize={"15px"}>
                (Get your product delivered to your home)
              </Text>
            </Box>

            <Box>
              <Text
                textAlign={"center"}
                color={"black"}
                fontSize={"20px"}
                marginTop="20px"
                marginBottom={"20px"}
              >
                Add your Address Here
              </Text>

              <FormControl
                isRequired
                border="1px solid #bab8b4"
                padding="20px"
                textAlign={"center"}
              >
                <Box>
                  <Flex
                    gap={5}
                    marginBottom="20px"
                    justifyContent={"center"}
                    flexDirection={{
                      base: "column",
                      sm: "column",
                      md: "row",
                      lg: "row",
                    }}
                  >
                    <FormControl isInvalid={errors.name}>
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        placeholder="Enter your name"
                        _focus={{ border: "1px solid #cea464" }}
                        value={address.name}
                        name="name"
                        onChange={handleChange}
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.mobile}>
                      <FormLabel>Mobile No.</FormLabel>
                      <Input
                        type="tel"
                        placeholder="+91 Enter mobile no"
                        _focus={{ border: "1px solid #cea464" }}
                        value={address.mobile}
                        onChange={handleChange}
                        name="mobile"
                        maxLength={10}
                      />
                      <FormErrorMessage>{errors.mobile}</FormErrorMessage>
                    </FormControl>
                  </Flex>

                  <Flex
                    flexDirection={{
                      base: "column",
                      sm: "column",
                      md: "row",
                      lg: "row",
                    }}
                    gap={5}
                    marginBottom="20px"
                    justifyContent={"center"}
                  >
                    <FormControl isInvalid={errors.pin}>
                      <FormLabel>Pincode</FormLabel>
                      <Input
                        type="tel"
                        placeholder="Enter your pincode"
                        _focus={{ border: "1px solid #cea464" }}
                        value={address.pin}
                        onChange={handleChange}
                        name="pin"
                        maxLength={6}
                      />
                      <FormErrorMessage>{errors.pin}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.city}>
                      <FormLabel>City</FormLabel>
                      <Input
                        placeholder="Enter your city"
                        _focus={{ border: "1px solid #cea464" }}
                        value={address.city}
                        onChange={handleChange}
                        name="city"
                      />
                      <FormErrorMessage>{errors.city}</FormErrorMessage>
                    </FormControl>
                  </Flex>

                  <Flex
                    flexDirection={{
                      base: "column",
                      sm: "column",
                      md: "row",
                      lg: "row",
                    }}
                    gap={5}
                    marginBottom="20px"
                    justifyContent={"center"}
                  >
                    <FormControl isInvalid={errors.state}>
                      <FormLabel>State</FormLabel>
                      <Input
                        placeholder="Enter your state"
                        _focus={{ border: "1px solid #cea464" }}
                        value={address.state}
                        onChange={handleChange}
                        name="state"
                      />
                      <FormErrorMessage>{errors.state}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.building}>
                      <FormLabel>Building Details</FormLabel>
                      <Input
                        placeholder="Enter building details"
                        _focus={{ border: "1px solid #cea464" }}
                        value={address.building}
                        onChange={handleChange}
                        name="building"
                      />
                      <FormErrorMessage>{errors.building}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                </Box>

                <Divider my={4} />

                <Button
                  onClick={handleSubmit}
                  type="submit"
                  bgColor="#df9018"
                  _hover={{ bgColor: "#f89f17" }}
                  color="white"
                  fontSize={{
                    base: "13px",
                    sm: "20px",
                    md: "18px",
                    lg: "20px",
                  }}
                  isLoading={isLoading}
                  loadingText="Adding Address..."
                >
                  Add Address
                </Button>
              </FormControl>

              <Divider my={4} />

              {shippingAddress && (
                <Flex
                  align={"center"}
                  textAlign={"center"}
                  border={"1px solid #bab8b4"}
                  marginTop="10px"
                  justifyContent="center"
                  gap={{ base: 0, sm: 20, md: 20, lg: 20 }}
                  flexDirection={{
                    base: "column",
                    sm: "row",
                    md: "row",
                    lg: "row",
                  }}
                  padding="20px"
                >
                  <Box>
                    <Text
                      color={"black"}
                      fontSize={"19px"}
                      marginTop="20px"
                      marginBottom={"5px"}
                      fontWeight="bold"
                    >
                      Your Shipping Address
                    </Text>
                    <Text color={"black"} fontSize={"17px"} fontWeight="semibold">
                      {shippingAddress.name}
                    </Text>
                    <Text color={"black"} fontSize={"17px"} fontWeight="semibold">
                      {shippingAddress.building}, {shippingAddress.city}
                    </Text>
                    <Text color={"black"} fontSize={"17px"} fontWeight="semibold">
                      {shippingAddress.state} - {shippingAddress.pin}
                    </Text>
                    <Text color={"black"} fontSize={"17px"} fontWeight="semibold">
                      Mobile: +91 {shippingAddress.mobile}
                    </Text>
                  </Box>

                  <Button
                    type="submit"
                    bgColor="#df9018"
                    _hover={{ bgColor: "#f89f17" }}
                    color="white"
                    fontSize={{
                      base: "13px",
                      sm: "20px",
                      md: "18px",
                      lg: "20px",
                    }}
                    marginTop="20px"
                    onClick={handleProceedToPayment}
                    isDisabled={isLoading}
                  >
                    Proceed to Payment
                  </Button>
                </Flex>
              )}
            </Box>
          </Box>

          {/* Order Summary */}
          <Box
            border="1px solid #bab8b4"
            padding={"20px"}
            width={{ base: "80%", sm: "80%", md: "40%", lg: "40%" }}
            margin={"0 auto"}
            height="fit-content"
          >
            <Text
              textAlign={"center"}
              color={"black"}
              fontSize={"22px"}
              marginBottom="15px"
            >
              Order Summary
            </Text>

            <Box border="1px solid #bab8b4" p={4}>
              <Flex justifyContent="space-between" mb={4}>
                <Text fontSize="lg">Total MRP</Text>
                <Text fontSize="lg" fontWeight="bold">
                  ₹{getTotalPrice()}
                </Text>
              </Flex>

              <Flex justifyContent="space-between" mb={4}>
                <Text fontSize="lg">Discount</Text>
                <Text fontSize="lg" fontWeight="bold" color="green.500">
                  - ₹{calculateSavings()}
                </Text>
              </Flex>

              <Flex justifyContent="space-between" mb={4}>
                <Text fontSize="lg">Shipping</Text>
                <Text fontSize="lg" fontWeight="bold" color="green.500">
                  FREE
                </Text>
              </Flex>

              <Divider my={4} />

              <Flex justifyContent="space-between" mb={4}>
                <Text fontSize="xl" fontWeight="bold">
                  Grand Total
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  ₹{getTotalPrice() - calculateSavings()}
                </Text>
              </Flex>
            </Box>

            <Box mt={6}>
              <Text fontWeight="bold" color="#df9018" mb={4}>
                Items in Cart
              </Text>

              {cartItems.map((item) => (
                <Flex
                  key={item.id}
                  flexDir={{
                    base: "column",
                    sm: "row",
                    md: "column",
                    lg: "row",
                  }}
                  gap={3}
                  border="1px solid #bab8b4"
                  p={3}
                  mb={3}
                  alignItems="center"
                >
                  <Image
                    width="70px"
                    height="100px"
                    src={item.image}
                    alt={item.title}
                    objectFit="cover"
                  />
                  <Box flex={1}>
                    <Text fontWeight="bold" fontSize="sm">
                      {item.title}
                    </Text>
                    <Text fontWeight="bold" fontSize="sm">
                      ₹{item.price}
                    </Text>
                    <Text fontSize="sm">Quantity: {item.quantity}</Text>
                  </Box>
                </Flex>
              ))}
            </Box>
          </Box>
        </Flex>
      </Box>

      <Footer />
    </Box>
  );
}

export default Checkout;
