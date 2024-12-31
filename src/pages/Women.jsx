/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { getwomens } from "../redux/MenReducer/action";
import { Box, Text, Grid, Progress, Spinner, Button, Center, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import Card from "../Components/Card";
import Pagination1 from "../Components/Filter/Pagination1";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";
import Menfilter from "../Components/Filter/Menfilter";

export const Women = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { women, isLoading, isError, total } = useSelector((store) => store.MenReducer);

  const queryParams = {
    params: {
      category: searchParams.getAll("category"),
      _page: searchParams.get("page"),
      _sort: searchParams.get("order") && "price",
      _order: searchParams.get("order"),
    },
  };

  useEffect(() => {
    dispatch(getwomens(queryParams));
  }, [location.search, dispatch, queryParams.params.category, queryParams.params._page, queryParams.params._order]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Center h="50vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
        <Footer />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Navbar />
        <Box p={4}>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
              Something went wrong while loading the products.
              <Button ml={4} colorScheme="red" onClick={() => dispatch(getwomens(queryParams))}>
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <Box position="relative">
        <Progress
          colorScheme="pink"
          hasStripe
          height="42px"
          value={100}
          isAnimated
        />
        <Text
          color={"white"}
          fontSize={{ base: "80%", sm: "100%", lg: "100%" }}
          position="absolute"
          top={{ base: "117px", sm: "115px", md: "142px", lg: "85px" }}
          left={{ base: "5%", sm: "27%", md: "30%", lg: "40%" }}
        >
          New arrivals in womenswear upto 30% off ❤️
        </Text>
      </Box>

      <Menfilter type={"women"} />

      {!women || women.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="xl" mb={4}>No products found</Text>
          <Button colorScheme="blue" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid
          width={"80%"}
          margin={"auto"}
          justifyContent="space-between"
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(4,1fr)",
          }}
          columnGap="20px"
          rowGap="20px"
          py={6}
        >
          {women.map((product) => (
            <Card key={product.id} {...product} id={product.id} type={"women"} />
          ))}
        </Grid>
      )}

      <Pagination1 />
      <Box mt={"30px"}>
        <Footer />
      </Box>
    </div>
  );
};
