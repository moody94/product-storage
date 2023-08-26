import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Spacer,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tfoot,
  Text,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
const ShowData = () => {
  const navigate = useNavigate();

  const items = { ...localStorage };
  const products: number[] = Object.values(items);

  //   setData(products);
  console.log("hge", products);

  return (
    <Box padding={30}>
      <Box
        p={100}
        bgGradient="#333"
        w="100%"
        h="70vh"
        boxShadow="dark-lg"
        borderRadius={10}
      >
        {products.length === 0 && <Text>There are no items to show </Text>}
        {/* {products.length > 0 ? products : "hej hje"} */}
        <>
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product: any) => (
                  <Tr>
                    <Td>
                      {" "}
                      <Th key={product}>{product}</Th>
                    </Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      </Box>
      <Spacer />
      <Button
        colorScheme="blue"
        onClick={() => {
          navigate("/addproduct");
        }}
        borderRadius="50%"
        h={100}
        w={100}
        m={10}
        left="90%"
      >
        <AddIcon w={10} h={10} color="white" />
      </Button>
    </Box>
  );
};

export default ShowData;
