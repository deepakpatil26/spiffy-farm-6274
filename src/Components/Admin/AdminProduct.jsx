/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Admin.css";
import {
  Card,
  CardBody,
  useToast,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Grid,
  Select,
  Center,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("women");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://lifestyle-mock-server-api.onrender.com/${category}`
      );
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
      toast({
        title: "Error fetching products",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [category]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://lifestyle-mock-server-api.onrender.com/men/${id}`);
      toast({
        title: "Product Deleted Successfully",
        description: "We have updated the repository",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      getData();
    } catch (error) {
      toast({
        title: "Error deleting product",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (error) {
    return (
      <>
        <AdminNavbar />
        <AdminSidebar />
        <Center mt={10}>
          <Text color="red.500">{error}</Text>
          <Button ml={4} onClick={getData}>Retry</Button>
        </Center>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <Select
        onChange={(e) => setCategory(e.target.value)}
        width="20%"
        h={"auto"}
        m="auto"
        border={"1px solid gainsboro"}
        mt={"20px"}
        mb={"20px"}
        ml={"300px"}
        gap={"20px"}
        bg={"#f7f8f7"}
      >
        <option value="women">Women</option>
        <option value="men">Men</option>
      </Select>

      {isLoading ? (
        <Center mt={10}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Grid
          width="70%"
          h={"auto"}
          m="auto"
          border={"1px solid gainsboro"}
          mt={"20px"}
          mb={"20px"}
          ml={"300px"}
          gap={"20px"}
          bg={"#f7f8f7"}
          gridTemplateColumns={"repeat(3,1fr)"}
        >
          {products.map((product) => (
            <Card maxW="sm" key={product.id}>
              <CardBody>
                <Image
                  src={product.image}
                  alt={product.title}
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{product.title}</Heading>
                  <Text>₹{product.price}</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Link to={`/editProduct/${product.id}`}>
                    <Button variant="solid" colorScheme="blue">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      )}
    </>
  );
}

export default AdminProduct;
