// import React, { useState, useReducer } from "react";
// import { ArrowBackIcon } from "@chakra-ui/icons";
// import { useNavigate } from "react-router-dom";
// import { Input, Stack, Box, Button, Text, Select } from "@chakra-ui/react";
// export const addproduct = "/addproduct";

// interface initialState {
//   productName: String;
//   productPrice: String;
//   productType: String;
// }
// interface ProductAction {
//   type: ProductActionKind;
//   payload: string;
// }

// const initialState = {
//   productName: "",
//   productPrice: "",
//   productType: "",
// };

// enum ProductActionKind {
//   PRODUCTNAME = "ProductName",
//   PRODUCTPRICE = "ProductPrice",
//   PRODUCTTYPE = "ProductType",
// }

// const reducer = (state: initialState, action: ProductAction) => {
//   switch (action.type) {
//     case ProductActionKind.PRODUCTNAME:
//       return { ...state, productName: action.payload };
//     case ProductActionKind.PRODUCTTYPE:
//       return { ...state, productType: action.payload };
//     case ProductActionKind.PRODUCTPRICE:
//       return { ...state, productPrice: action.payload };
//     case ProductActionKind.PRODUCTPRICE:
//       return { ...state, productPrice: action.payload };
//     default:
//       return state;
//   }
// };

// const AddProduct = () => {
//   const navigate = useNavigate();

//   // used like usestate but for many states
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [errorMessage, setErrorMessage] = useState(false);
//   console.log("state", state);
//   const setProductName = () => {
//     // get item from the storage
//     const itemExists = localStorage.getItem(state.productName);
//     // if found the item change the valie to true
//     setErrorMessage(itemExists !== null);
//     // IF NOT exist add the value
//     if (!itemExists) {
//       localStorage.setItem(
//         state.productName,
//         JSON.stringify({
//           productPrice: state.productPrice,
//           productType: state.productType,
//         })
//       );
//     }
//   };

//   //type represenet the name of the object element that i want to prosses
//   // paylod represent the info that i want to send

//   // if we compare the dispatch with a postnord transfer the packet represent the paylod the action is the transfare the address() is the type
//   // if we compare the dispatch with a postnord transfer the packet represent the paylod. the action type points to the place the reciever should take the package (payload)

//   return (
//     <>
//       <Box m={20}>
//         <Text fontSize="3xl">Create a new product</Text>
//         <Stack boxShadow="Base">
//           <Input
//             variant="filled"
//             placeholder="Product"
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               dispatch({
//                 type: ProductActionKind.PRODUCTNAME,
//                 payload: e.target.value,
//               })
//             }
//           />
//           {errorMessage && <Text>Error: The Product already exists.</Text>}
//           <Input
//             variant="filled"
//             placeholder="Price"
//             onChange={(e: any) =>
//               dispatch({
//                 type: ProductActionKind.PRODUCTPRICE,
//                 payload: e.target.value,
//               })
//             }
//           />
//           <Select
//             onChange={(e: any) =>
//               dispatch({
//                 type: ProductActionKind.PRODUCTTYPE,
//                 payload: e.target.value,
//               })
//             }
//             placeholder="Select your product Type"
//           >
//             <option value="Integrated">Integrated</option>
//             <option value="Peripheral">Peripheral</option>
//           </Select>
//         </Stack>
//         <br></br>
//         <Button colorScheme="green" onClick={setProductName}>
//           Save
//         </Button>
//         <Button
//           onClick={() => {
//             navigate("/");
//           }}
//         >
//           {" "}
//           Cancle <ArrowBackIcon />
//         </Button>
//       </Box>
//     </>
//   );
// };

// export default AddProduct;
