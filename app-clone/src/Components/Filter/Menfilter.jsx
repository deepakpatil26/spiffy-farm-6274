import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Menfilter = ({ type }) => {
  const getCurrentPage = (page) => {
    page = Number(page);

    if (typeof page !== "number" || page <= 0 || !page) {
      return 1;
    }
    return page;
  };
  const initRef = React.useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.getAll("category");
  const [category, setCategory] = useState(initialCategory || []);
  const [page, setPage] = useState(getCurrentPage(searchParams.get("page")));
  const intialOrder = searchParams.get("order");
  const [order, setOrder] = useState(intialOrder || "");

  const handleSort = (e) => {
    setOrder(e.target.value);
  };

  const handleChange = (e) => {
    let newCategory = [...category];
    const value = e.target.value;
    if (newCategory.includes(value)) {
      newCategory = newCategory.filter((el) => {
        return el !== value;
      });
    } else {
      newCategory.push(value);
    }
    setCategory(newCategory);
  };

  useEffect(() => {
    let params = {
      page,
      category,
    };
    console.log(type);
    order && (params.order = order);
    setSearchParams(params);
  }, [category, page, order]);

  return (
    <Flex
      //   style={{
      //     display: "flex",
      //     width: "auto",
      //     backgroundColor: "	#F0F0F0",
      //     justifyContent: "center",
      //     gap: "20px",
      //     margin: "40px",
      //     padding: "15px",
      //   }}'
      width="auto"
      flexDirection={{ base: "column", sm: "column", md: "row", lg: "row" }}
      gap="20px"
      margin="40px"
      padding="15px"
      backgroundColor="	#F0F0F0"
      justifyContent={"center"}
    >
      <div onChange={handleSort}>
        <Popover
          trigger={"hover"}
          closeOnBlur={false}
          placement="bottom-start"
          initialFocusRef={initRef}
        >
          {({ isOpen, onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  fontSize={{ base: "15px", sm: "20px", md: "20px" }}
                  style={{ backgroundColor: "white" }}
                >
                  Filter By Price
                  <span style={{ marginLeft: "10px" }}>
                    {isOpen ? (
                      <ChevronDownIcon fontSize={"xl"} />
                    ) : (
                      <ChevronUpIcon fontSize={"xl"} />
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverBody>
                    <input
                      style={{ marginRight: "10px" }}
                      value={"asc"}
                      type="radio"
                      name="order"
                      defaultChecked={order === "asc"}
                    />
                    <label>Low To High</label>
                    <br />
                    <br />
                    <input
                      style={{ marginRight: "10px" }}
                      value={"desc"}
                      name="order"
                      type="radio"
                      defaultChecked={order === "desc"}
                    />
                    <label>High To Low</label>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </>
          )}
        </Popover>
      </div>

      <div>
        <Popover
          trigger={"hover"}
          closeOnBlur={false}
          placement="bottom-start"
          initialFocusRef={initRef}
        >
          {({ isOpen, onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  fontSize={{ base: "15px", sm: "20px", md: "20px" }}
                  style={{ backgroundColor: "white" }}
                >
                  Filter By Category{" "}
                  <span style={{ marginLeft: "10px" }}>
                    {isOpen ? (
                      <ChevronDownIcon fontSize={"xl"} />
                    ) : (
                      <ChevronUpIcon fontSize={"xl"} />
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverBody>
                    <input
                      onChange={handleChange}
                      checked={category.includes(
                        type === "men"
                          ? "Casual Shirts"
                          : "Dresses and Jumpsuits"
                      )}
                      style={{ marginRight: "10px" }}
                      value={
                        type === "men"
                          ? "Casual Shirts"
                          : "Dresses and Jumpsuits"
                      }
                      type="checkbox"
                    />
                    <label>
                      {type === "men"
                        ? "Casual Shirts"
                        : "Dresses and Jumpsuits"}
                    </label>
                    <br />
                    <br />
                    <input
                      onChange={handleChange}
                      checked={category.includes(
                        type === "men" ? "Jeans" : "Kurtas and Kurtis"
                      )}
                      style={{ marginRight: "10px" }}
                      value={type === "men" ? "Jeans" : "Kurtas and Kurtis"}
                      type="checkbox"
                    />
                    <label>
                      {type === "men" ? "Jeans" : "Kurtas and Kurtis"}
                    </label>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </>
          )}
        </Popover>
      </div>
    </Flex>
  );
};

export default Menfilter;
