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
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

function AdminProduct() {
  const [men, setMen] = useState([]);
  const [category, setCatergory] = useState("women");
  const toast = useToast();

  const getData = () => {
    axios
      .get(`https://lifestyle-mock-server-api.onrender.com/${category}`)
      .then((res) => {
        // console.log(res.data)
        setMen(res.data);
      });
  };
  useEffect(() => {
    getData();
  }, [men]);

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`https://lifestyle-mock-server-api.onrender.com/men/${id}`)
      .then((res) => {
        toast({
          title: "Product Deleted Successful.",
          description: "We have updated the repository",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        getData();
      })
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <Select
        onChange={(e) => setCatergory(e.target.value)}
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
        {men.length > 0 &&
          men.map((el) => {
            return (
              <Card maxW="sm" key={el.id}>
                <CardBody>
                  <Image
                    src={el.image}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{el.title}</Heading>

                    <Text color="blue.600" fontSize="2xl">
                      ₹ {el.price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Link to={`/editProduct/${el.id}`}>
                      <Button colorScheme="blue">Edit Product</Button>
                    </Link>

                    <Button
                      onClick={() => handleDelete(el.id)}
                      colorScheme="blue"
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
      </Grid>
    </>
  );
}

export default AdminProduct;
