import { Box, Button, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Pagination1 = () => {
  const { total } = useSelector((store) => {
    return store.MenReducer;
  });
  const getCurrentPage = (page) => {
    page = Number(page);

    if (typeof page !== "number" || page <= 0 || !page) {
      return 1;
    }
    return page;
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(getCurrentPage(searchParams.get("page")));

  const handlePage = (val) => {
    setPage((prev) => prev + val);
  };

  useEffect(() => {
    let params = {
      page,
    };
    // page && (params.page = page);
    setSearchParams(params);
  }, [page]);

  return (
    <Box width={"80%"} margin="auto">
      <Center>
        <Box>
          <Button isDisabled={page === 1} onClick={() => handlePage(-1)}>
            Prev
          </Button>{" "}
          <span />
          <Button>{page}</Button> <span />
          <Button
            isDisabled={page === Math.ceil(total / 12)}
            onClick={() => handlePage(+1)}
          >
            Next
          </Button>
        </Box>
      </Center>
    </Box>
  );
};

export default Pagination1;
