import React, { useState } from "react";
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
} from "@chakra-ui/react";
import Navbar from "../Components/Home/Navbar";
// import { Link } from 'react-router-dom'
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
function Checkout() {
  const toast = useToast();
  const navigate = useNavigate();
  let saved = 0;

  const { cartItems } = useSelector((store) => store.cartReducer);
  cartItems.forEach((item) => {
    saved =
      saved +
      (Math.floor(item.price) -
        Math.floor(item.price - (10 * item.price) / 100)) *
        item.quantity;
  });

  const [address, setAddress] = useState(initialState);
  const [storeADD, setStoreADD] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      address.name === "" ||
      address.mobile === "" ||
      address.pin === "" ||
      address.city === "" ||
      address.state === "" ||
      address.building === ""
    ) {
      toast({
        description: "fill all details",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    } else {
      setStoreADD(address);
      setAddress(initialState);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, e) => total + e.price * e.quantity, 0);
  };

  return (
    <Box>
      <Box>
        <Navbar />
      </Box>

      <Box
        width={{ base: "90%", sm: "90%", md: "90%", lg: "80%" }}
        margin="auto"
      >
        <Box pt={"20px"} pb="20px">
          <Text color={"gray.600"} fontSize={"24px"}>
            {" "}
            Checkout & Shipping{" "}
          </Text>
        </Box>
        <Box>
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
                  padding="20px 10px 20px 10px"
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
                      <Box>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                          placeholder="Enter your name"
                          _focus={{ border: "1px solid #cea464" }}
                          value={address.name}
                          name="name"
                          onChange={handleChange}
                        />
                      </Box>

                      <Box>
                        <FormLabel>Mobile No.</FormLabel>
                        <Input
                          type={"number"}
                          placeholder="+91 Enter mobile no"
                          _focus={{ border: "1px solid #cea464" }}
                          value={address.mobile}
                          onChange={handleChange}
                          name="mobile"
                        />
                      </Box>
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
                      <Box>
                        <FormLabel>Pincode</FormLabel>
                        <Input
                          type={"number"}
                          placeholder="Enter your pincode"
                          _focus={{ border: "1px solid #cea464" }}
                          value={address.pin}
                          onChange={handleChange}
                          name="pin"
                        />
                      </Box>

                      <Box>
                        <FormLabel>City</FormLabel>
                        <Input
                          placeholder="Enter your city"
                          _focus={{ border: "1px solid #cea464" }}
                          value={address.city}
                          onChange={handleChange}
                          name="city"
                        />
                      </Box>
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
                      <Box>
                        <FormLabel>State</FormLabel>
                        <Input
                          placeholder="Enter your state"
                          _focus={{ border: "1px solid #cea464" }}
                          value={address.state}
                          onChange={handleChange}
                          name="state"
                        />
                      </Box>

                      <Box>
                        <FormLabel>Details</FormLabel>
                        <Input
                          placeholder=" Enter building details"
                          _focus={{ border: "1px solid #cea464" }}
                          value={address.building}
                          onChange={handleChange}
                          name="building"
                        />
                      </Box>
                    </Flex>
                  </Box>

                  <Divider />

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
                    marginTop="20px"
                  >
                    Add Address
                  </Button>
                </FormControl>

                <Divider />
                {storeADD !== "" ? (
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
                    padding="20px 10px 20px 10px"
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
                      <Text
                        color={"black"}
                        fontSize={"17px"}
                        fontWeight="semibold"
                      >
                        {storeADD.name}
                      </Text>
                      <Text
                        color={"black"}
                        fontSize={"17px"}
                        fontWeight="semibold"
                      >
                        {storeADD.building},{storeADD.city}
                      </Text>
                      <Text
                        color={"black"}
                        fontSize={"17px"}
                        fontWeight="semibold"
                      >
                        {storeADD.state},{storeADD.state} {storeADD.pin}
                      </Text>

                      <Text
                        color={"black"}
                        fontSize={"17px"}
                        fontWeight="semibold"
                      >
                        Mobile No: +91{storeADD.mobile}
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
                      onClick={() => {
                        navigate("/payment");
                      }}
                    >
                      Proceed to Payment
                    </Button>
                  </Flex>
                ) : (
                  ""
                )}
              </Box>
            </Box>

            {/* -------- */}

            <Box
              border="1px solid #bab8b4"
              padding={"20px"}
              width={{ base: "80%", sm: "80%", md: "40%", lg: "40%" }}
              margin={"0 auto"}
            >
              <Text
                textAlign={"center"}
                color={"black"}
                fontSize={"22px"}
                marginBottom="15px"
              >
                Payable Amount
              </Text>
              <Box
                border="1px solid #bab8b4"
                width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
                margin={"0 auto"}
                height="150px"
              >
                <Flex
                  justifyContent={"space-around"}
                  marginBottom="20px"
                  marginTop={"10px"}
                >
                  <Text
                    fontSize={{
                      base: "14px",
                      sm: "17px",
                      md: "16px",
                      lg: "18px",
                    }}
                  >
                    Total MRP
                  </Text>
                  <Text
                    fontSize={{
                      base: "14px",
                      sm: "17px",
                      md: "16px",
                      lg: "18px",
                    }}
                    fontWeight="bold"
                  >
                    ₹{getTotalPrice() - saved} /-
                  </Text>
                </Flex>

                <Flex justifyContent={"space-around"} marginBottom="20px">
                  <Text
                    fontSize={{
                      base: "14px",
                      sm: "17px",
                      md: "16px",
                      lg: "18px",
                    }}
                  >
                    Standard Shipping
                  </Text>
                  <Text
                    fontSize={{
                      base: "14px",
                      sm: "17px",
                      md: "16px",
                      lg: "18px",
                    }}
                    fontWeight="bold"
                    color={"green"}
                  >
                    Free
                  </Text>
                </Flex>
                <Box width="90%" margin="0 auto 10px auto">
                  <Divider />
                </Box>

                <Flex justifyContent={"space-around"} marginBottom="20px">
                  <Text
                    fontSize={{
                      base: "14px",
                      sm: "17px",
                      md: "16px",
                      lg: "18px",
                    }}
                    fontWeight="semibold"
                  >
                    Grand Total
                  </Text>
                  <Text
                    fontSize={{
                      base: "14px",
                      sm: "17px",
                      md: "16px",
                      lg: "18px",
                    }}
                    fontWeight="bold"
                  >
                    ₹{getTotalPrice() - saved} /-
                  </Text>
                </Flex>
              </Box>
              <Box marginTop={"20px"}>
                <Text fontWeight={"bold"} color="#df9018" marginBottom={"5px"}>
                  Order Summary
                </Text>

                {cartItems.map((item) => {
                  return (
                    <Flex
                      flexDir={{
                        base: "column",
                        sm: "row",
                        md: "column",
                        lg: "row",
                      }}
                      gap={3}
                      border="1px solid #bab8b4"
                      padding={"5px"}
                      mb="10px"
                    >
                      <Box>
                        <Image width="70px" height="100px" src={item.image} />
                      </Box>
                      <Box>
                        <Text
                          fontWeight={"bold"}
                          fontSize={{
                            base: "12px",
                            sm: "14px",
                            md: "16px",
                            lg: "16px",
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text
                          fontWeight={"bold"}
                          fontSize={{
                            base: "12px",
                            sm: "14px",
                            md: "16px",
                            lg: "16px",
                          }}
                        >
                          ₹{item.price}/-
                        </Text>
                        <Text
                          fontSize={{
                            base: "12px",
                            sm: "14px",
                            md: "16px",
                            lg: "16px",
                          }}
                        >
                          Qty:{item.quantity}
                        </Text>
                        <Text
                          fontSize={{
                            base: "12px",
                            sm: "14px",
                            md: "16px",
                            lg: "16px",
                          }}
                        >
                          📆 Delivery by 3-4 days
                        </Text>
                      </Box>
                    </Flex>
                  );
                })}
              </Box>
              <Box fontSize={"12px"} color="#939290">
                <Box mb="10px">
                  <Image src="https://i1.lmsin.net/website_images/in/checkout/comodo-secure-icon.svg" />
                </Box>
                <Text mb="10px">
                  Your credit card details are securely encrypted and passed
                  directly to our PCI DSS compliant Payment Gateway for
                  processing. We only store your credit card's last 4 digits and
                  the expiration date. Your traffic to this page is secured
                  using either a 256-bit or 128-bit SSL certificate depending on
                  your browser version.
                </Text>
                <Text mb="10px">© 2021 RNA Intellectual Property Limited.</Text>
                <Text mb="10px">
                  Privacy Policy-Terms of Use- Terms & Condition{" "}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box
        width={{ base: "90%", sm: "90%", md: "90%", lg: "85%" }}
        margin="auto"
      >
        <Divider />
        <Footer />
      </Box>
    </Box>
  );
}

export default Checkout;
