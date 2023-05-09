import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { RiQuestionnaireFill } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import Logo from "../../Asssets/logo2.png";

const Footer = () => {
  return (
    <Box
      className="footer"
      color={"gray"}
      marginTop={"20px"}
      fontFamily={"sans-serif"}
    >
      <Flex>
        <Flex
          justifyContent={"space-between"}
          width="90%"
          margin={"auto"}
          flexDirection={{ base: "column", sm: "column", md: "row", lg: "row" }}
          gap={10}
        >
          <Box>
            <Text
              color={"black"}
              fontWeight="bold"
              fontSize={{ base: "15px", sm: "20px", md: "20px", lg: "22px" }}
              textAlign="center"
            >
              Subscribe to our awesome emails.
            </Text>

            <Text textAlign="center" fontSize={"15px"}>
              Get our latest offers and news straight in your inbox.
            </Text>

            <Flex justify={"center"} gap={5} marginTop={7}>
              <Input bg={"white"} width="250px" />
              <Button
                bg={"black"}
                _hover={{ bg: "black" }}
                color="white"
                width={{ base: "70%", sm: "20%", md: "20%", lg: "25%" }}
              >
                Subscribe
              </Button>
            </Flex>
          </Box>

          <Box>
            <Text
              textAlign="center"
              color={"black"}
              fontWeight="bold"
              fontSize={{ base: "15px", sm: "20px", md: "20px", lg: "25px" }}
            >
              Download our apps
            </Text>

            <Text textAlign="center" fontSize={"15px"}>
              Shop our products and offers on-the-go.
            </Text>

            <Flex justify={"center"} gap={5} marginTop={7}>
              <Image
                width={{ base: "40%", sm: "25%", md: "40%", lg: "20%" }}
                src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png"
              />
              <Image
                width={{ base: "40%", sm: "25%", md: "40%", lg: "20%" }}
                src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png"
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Divider mt="50px" />

      <Grid
        mt={"50px"}
        gridTemplateColumns={{
          base: "repeat(2,1fr)",
          sm: "repeat(3,1fr)",
          md: "repeat(4,1fr)",
          lg: "repeat(5,1fr)",
        }}
        rowGap={10}
        ml="5%"
      >
        <Box width="60%" textAlign={"left"} fontSize={"14px"}>
          <Text fontWeight="bold" fontSize={"16px"} color={"black"} mb={1}>
            Women
          </Text>
          <Text mb={"2px"}>Tops</Text>
          <Text mb={"2px"}>Ethnicwear</Text>
          <Text mb={"2px"}>Bottoms</Text>
          <Text mb={"2px"}>Dresses</Text>
          <Text mb={"2px"}>Jumpsuits</Text>
          <Text mb={"2px"}>Winterwear</Text>
          <Text mb={"2px"}>Lingerie</Text>
          <Text mb={"2px"}>Sportswear</Text>
          <Text mb={"2px"}>Beauty</Text>
          <Text mb={"2px"}>Watches</Text>
          <Text mb={"2px"}>sunglasses</Text>
        </Box>

        <Box width="60%" textAlign={"left"} fontSize={"14px"}>
          <Text fontWeight="bold" fontSize={"16px"} color={"black"} mb={1}>
            Men
          </Text>
          <Text mb={"2px"}>Tops</Text>
          <Text mb={"2px"}>Bottoms</Text>
          <Text mb={"2px"}>Ethnicwear</Text>
          <Text mb={"2px"}>Winterwear</Text>
          <Text mb={"2px"}>Sportswear</Text>
          <Text mb={"2px"}>Innerwear</Text>
          <Text mb={"2px"}>Grooming</Text>
          <Text mb={"2px"}>Watches</Text>
          <Text mb={"2px"}>sunglasses</Text>
        </Box>

        <Box width="60%" textAlign={"left"} fontSize={"14px"}>
          <Text fontWeight="bold" fontSize={"16px"} color={"black"} mb={1}>
            Kids
          </Text>
          <Text mb={"2px"}>Girls Clothing</Text>
          <Text mb={"2px"}>Boys clothing</Text>
          <Text mb={"2px"}>Infants Girls</Text>
          <Text mb={"2px"}>Infants Boys</Text>
          <Text mb={"2px"}>winterwear</Text>
          <Text mb={"2px"}>Add ons</Text>
          <Text mb={"2px"}>The Teen Shop</Text>
        </Box>

        <Box width="65%" textAlign={"left"} fontSize={"14px"}>
          <Text fontWeight="bold" fontSize={"16px"} color={"black"} mb={1}>
            Shoes & Bags
          </Text>
          <Text mb={"2px"}>women</Text>
          <Text mb={"2px"}>Men</Text>
          <Text mb={"2px"}>Boys</Text>
          <Text mb={"2px"}>Girls</Text>
          <Text mb={"2px"}>Accessories</Text>
          <Text mb={"2px"}>Essentials</Text>
        </Box>

        <Box width="60%" textAlign={"left"} fontSize={"14px"}>
          <Text fontWeight="bold" fontSize={"16px"} color={"black"} mb={1}>
            Beauty
          </Text>
          <Text mb={"2px"}>Makeup Eyes</Text>
          <Text mb={"2px"}>Makeup Face</Text>
          <Text mb={"2px"}>Makeup Lips</Text>
          <Text mb={"2px"}>Makeup Nails</Text>
          <Text mb={"2px"}>Perfumes</Text>
        </Box>

        <Box width="65%" textAlign={"left"} fontSize={"14px"}>
          <Text fontWeight="bold" fontSize={"16px"} color={"black"} mb={1}>
            Explore
          </Text>
          <Text mb={"2px"}>Online Offers</Text>
          <Text mb={"2px"}>Store Offers</Text>
          <Text mb={"2px"}>Online Gift Card</Text>
          <Text mb={"2px"}>Store Gift Card</Text>
          <Text mb={"2px"}>Stores Nearby</Text>
          <Text mb={"2px"}>EDGE</Text>
          <Text mb={"2px"}>Membership</Text>
        </Box>

        <Box width="60%" textAlign={"left"} fontSize={"14px"}>
          <Text fontWeight="bold" fontSize={"16px"} color={"black"} mb={1}>
            About
          </Text>
          <Text mb={"2px"}>About us</Text>
          <Text mb={"2px"}>Careers</Text>
          <Text mb={"2px"}>Take a Tour</Text>
          <Text mb={"2px"}>Blog</Text>
          <Text mb={"2px"}>Store Locator</Text>
          <Text mb={"2px"}>Landmark Cares</Text>
        </Box>

        <Box width="60%" textAlign={"left"} fontSize={"14px"}>
          <Text fontWeight="bold" fontSize={"16px"} color={"black"} mb={1}>
            Help
          </Text>
          <Text mb={"2px"}>Contact us</Text>
          <Text mb={"2px"}>Shipping</Text>
          <Text mb={"2px"}>Returns Process</Text>
          <Text mb={"2px"}>Returns Policy</Text>
          <Text mb={"2px"}>Help Center</Text>
        </Box>
      </Grid>

      <Divider mt="50px" />
      <Flex
        color={"black"}
        justifyContent="space-between"
        flexDir={{ lg: "row", md: "row", sm: "column", base: "column" }}
        mt="30px"
      >
        <Grid
          // border={"1px solid gray"}
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
          }}
          gap={5}
        >
          <Flex
            gap={4}
            // border={"1px solid gray"}
            width={{ base: "220px", sm: "220px", md: "100%", lg: "100%" }}
            margin={{ sm: "auto", md: "0", lg: "0", base: "auto" }}
          >
            <Box
              border={"1px solid gray"}
              width="50px"
              height="50px"
              pt="6%"
              pl="6%"
              borderRadius={"50%"}
            >
              <MdCall fontSize={"24px"} />
            </Box>
            <Box>
              <Text color={"gray"} fontSize={"14px"}>
                Talk to us
              </Text>
              <Text>1800-123-1555</Text>
            </Box>
          </Flex>

          <Flex
            gap={4}
            // border={"1px solid gray"}
            width={{ base: "220px", sm: "220px", md: "100%", lg: "100%" }}
            margin={{ sm: "auto", md: "0", lg: "0", base: "auto" }}
          >
            <Box
              border={"1px solid gray"}
              width="50px"
              height="50px"
              pt="6%"
              pl="6%"
              borderRadius={"50%"}
            >
              <RiQuestionnaireFill fontSize={"24px"} />
            </Box>
            <Box>
              <Text color={"gray"} fontSize={"14px"}>
                Helpcentre
              </Text>
              <Text>help@outfitstore.com</Text>
            </Box>
          </Flex>
          <Flex
            gap={4}
            // border={"1px solid gray"}
            width={{ base: "220px", sm: "220px", md: "100%", lg: "100%" }}
            margin={{ sm: "auto", md: "0", lg: "0", base: "auto" }}
          >
            <Box
              border={"1px solid gray"}
              width="50px"
              height="50px"
              pt="6%"
              pl="6%"
              borderRadius={"50%"}
            >
              <FiMail fontSize={"24px"} />
            </Box>
            <Box>
              <Text color={"gray"} fontSize={"14px"}>
                Write to us
              </Text>
              <Text>help@outfitstore.com</Text>
            </Box>
          </Flex>
        </Grid>

        <Box
          // border={"1px solid gray"}
          alignItems="center"
          mt={"30px"}
        >
          <Flex
            alignItems="center"
            gap={10}
            margin="auto"
            justifyContent={"center"}
          >
            <Box>
              <AiFillFacebook fontSize={"24px"} />
            </Box>
            <Box>
              <FaTwitter fontSize={"24px"} />
            </Box>
            <Box>
              <BsInstagram fontSize={"24px"} />
            </Box>
            <Box>
              <BsYoutube fontSize={"24px"} />
            </Box>
          </Flex>
        </Box>
      </Flex>

      <Divider mt="50px" />

      <Box>
        <Flex
          flexDir={{ lg: "row", md: "row", sm: "row", base: "column" }}
          gap={5}
          mt="20px"
          pb={"20px"}
        >
          <Box>
            <Image
              alt="logo"
              width={{ base: "120px", sm: "120px", md: "170", lg: "170px" }}
              height={{ base: "40%", sm: "60%", md: "100%", lg: "100%" }}
              src={Logo}
            />
          </Box>
          <Box>
            <Text
              color={"gray"}
              fontSize={{ base: "12px", sm: "14px", md: "14", lg: "14px" }}
            >
              © 2023 RNA Intellectual Property Limited.
            </Text>
            <Text
              color={"gray"}
              fontSize={{ base: "12px", sm: "14px", md: "14", lg: "14px" }}
            >
              Terms & Conditions - Privacy Policy
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
