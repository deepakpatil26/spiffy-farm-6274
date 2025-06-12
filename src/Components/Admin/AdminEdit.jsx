import React, { useEffect, useState } from "react";
import "./Admin.css";

import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";

const initailState = {
  image: "",
  img1: "",
  img2: "",
  img3: "",
  img4: "",
  price: 0,
  actualPrice: 0,
  title: "",
  gender: "",
  category: "",
};

const AdminEdit = () => {
  const [product, setProduct] = useState(initailState);
  const { id } = useParams();
  const toast = useToast();

  const handleChange = (e) => {
    let { value } = e.target;
    setProduct((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `https://lifestyle-mock-server-api.onrender.com/men/${id}`,
        product
      )
      .then((res) => {
        toast({
          title: "Product Edited Success",
          description: "We have edited our Product",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setProduct(initailState);
  };

  useEffect(() => {
    axios
      .get(`https://lifestyle-mock-server-api.onrender.com/men/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <FormControl
      onSubmit={handleSubmit}
      width="30%"
      h={"auto"}
      m="auto"
      border={"1px solid gainsboro"}
      mt={"20px"}
      mb={"20px"}
      gap={"20px"}
      bg={"#f7f8f7"}
    >
      <FormLabel mt={"12px"}>Image</FormLabel>
      <Input
        type="text"
        value={product.image}
        name="image"
        onChange={handleChange}
      />

      <FormLabel mt={"12px"}>Image1</FormLabel>
      <Input
        type="text"
        value={product.img1}
        name="img1"
        onChange={(e) => handleChange(e)}
      />

      <FormLabel mt={"12px"}>Image2</FormLabel>
      <Input
        type="text"
        value={product.img2}
        name="img2"
        onChange={(e) => handleChange(e)}
      />

      <FormLabel mt={"12px"}>Image3</FormLabel>
      <Input
        type="text"
        value={product.img3}
        name="img3"
        onChange={(e) => handleChange(e)}
      />

      <FormLabel mt={"12px"}>Image4</FormLabel>
      <Input
        type="text"
        value={product.img4}
        name="img4"
        onChange={(e) => handleChange(e)}
      />

      <FormLabel mt={"12px"}>Price</FormLabel>
      <Input
        type="number"
        value={product.price}
        name="price"
        onChange={(e) => handleChange(e)}
      />

      <FormLabel mt={"12px"}>Actual Price</FormLabel>
      <Input
        type="number"
        value={product.actualPrice}
        name="actualPrice"
        onChange={(e) => handleChange(e)}
      />

      <FormLabel mt={"12px"}>Title</FormLabel>
      <Input
        type="text"
        value={product.title}
        name="title"
        onChange={(e) => handleChange(e)}
      />

      <FormLabel mt={"12px"}>Gender</FormLabel>
      <Select
        name="gender"
        placeholder="Select Gender"
        onChange={(e) => handleChange(e)}
      >
        <option value={"men"}>Men</option>
        <option value={"women"}>Women</option>
      </Select>

      <FormLabel mt={"12px"} mb={"10px"}>
        Category
      </FormLabel>
      <Select
        name="category"
        placeholder="Select Catergory"
        onChange={(e) => handleChange(e)}
      >
        <option
          value={
            product.gender === "women" ? "Kurtas and Kurtis" : "Casual Shirts"
          }
        >
          {product.gender === "women" ? "Kurtas and Kurtis" : "Casual Shirts"}
        </option>
        <option
          value={product.gender === "women" ? "Dresses and Jumpsuits" : "Jeans"}
        >
          {product.gender === "women" ? "Dresses and Jumpsuits" : "Jeans"}
        </option>
      </Select>

      {/* <Input type="submit"/> */}
      <Button ml={"155px"} mt={"20px"} bg={"skyblue"} onClick={handleSubmit}>
        Edit Product
      </Button>
    </FormControl>
  );
};
export default AdminEdit;