import React, { useState, useReducer, createContext } from "react";
import { DownloadIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Stack,
  Box,
  Button,
  Text,
  Select,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import validateInput from "../utils/validateInput";
import { onInputChange } from "../utils/formutils";
import formReducer from "../reducers/formReducer";
import {
  UPDATE_FORM,
  FormState,
  FormField,
  UpdateFormAction,
} from "../types/platfromsTypes";
export const addproduct = "/addproduct";

export const initialState = {
  productName: { value: "", hasError: false, error: "" },
  productPrice: { value: "", hasError: false, error: "" },
  productType: { value: "", hasError: false, error: "" },
  isFormValid: false,
};

const AddProduct = () => {
  const navigate = useNavigate();
  // const ProductFromContex = createContext();
  // used like usestate but for many states
  // const [state, dispatch] = useReducer(formReducer, initialState);
  const [showError, setShowError] = useState(false);
  const [state, dispatch] = useReducer<
    React.Reducer<FormState, UpdateFormAction>
  >(formReducer, initialState);

  const setProductInfo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); //prevents the form from submitting
    let isFormValid = true;
    // loop throw the for loop after i fill it with new values
    // this loop to get the error setuation and the error name from the validate input page
    for (const name in state) {
      const item = state[name as keyof FormState];
      const { value } = item as FormField;
      // ?????????
      const { hasError, error } = validateInput(
        name,
        value,
        false,
        state.productType.value === "Integrated"
      );

      if (hasError) {
        isFormValid = false;
      }
      if (name) {
        dispatch({
          type: UPDATE_FORM,
          payload: { name, value, hasError, error, isFormValid },
        });
      }
    }
    if (!isFormValid) {
      setShowError(true);
    } else {
      localStorage.setItem(
        state.productName.value,
        JSON.stringify({
          productPrice: state.productPrice.value,
          productType: state.productType.value,
        })
      );
      navigate("/");
    }

    // Hide the error message after 5 seconds
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };
  const [selectedValue, setSelectedValue] = useState("");
  const ProductNameHandlar = (e: React.ChangeEvent<HTMLInputElement>) =>
    onInputChange("productName", e.target.value, dispatch, state, false, true);
  const ProductPriceHandlar = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(
      "productPrice",
      e.target.value,
      dispatch,
      state,
      false,
      state.productType.value === "Integrated"
    );
    console.log("selectedValue", selectedValue);
  };
  const ProductTypeHandlar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onInputChange("productType", e.target.value, dispatch, state, false, true);
    setSelectedValue(e.target.value);
  };
  //type represenet the name of the object element that i want to prosses
  // paylod represent the info that i want to send

  // if we compare the dispatch with a postnord transfer the packet represent the paylod the action is the transfare the address() is the type
  // if we compare the dispatch with a postnord transfer the packet represent the paylod. the action type points to the place the reciever should take the package (payload)

  return (
    <>
      <Box m={20}>
        <Text fontSize="3xl">Create a new product</Text>
        <FormControl isInvalid={showError && !state.isFormValid}>
          <FormErrorMessage>
            Please fill all the fields correctly
          </FormErrorMessage>
        </FormControl>
        <Stack boxShadow="Base">
          <FormControl isInvalid={state.productName.hasError}>
            <FormLabel>Product</FormLabel>
            <Input
              variant="filled"
              placeholder="Product"
              onChange={ProductNameHandlar}
            />
            <FormErrorMessage>{state.productName.error}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={state.productPrice.hasError}>
            <FormLabel>Price</FormLabel>
            <Input
              variant="filled"
              placeholder="Price"
              onChange={ProductPriceHandlar}
            />
            <FormErrorMessage>{state.productPrice.error}</FormErrorMessage>
            {
              // console.log("selectedValue", state.productType.value)
              state.productType.value === "Integrated" &&
              parseInt(state.productPrice.value) < 1500
                ? state.productPrice.hasError === true && (
                    <Text>Price is not valid</Text>
                  )
                : null
            }
          </FormControl>

          <FormControl isInvalid={state.productType.hasError}>
            <FormLabel>Product Type</FormLabel>
            <Select
              onChange={ProductTypeHandlar}
              // value={selectedValue}
              placeholder="Select your product Type"
            >
              <option value="Integrated">Integrated</option>
              <option value="Peripheral">Peripheral</option>
            </Select>
            <FormErrorMessage>{state.productType.error}</FormErrorMessage>
          </FormControl>
        </Stack>
        <br></br>
        <Button colorScheme="green" onClick={setProductInfo}>
          Save <DownloadIcon />
        </Button>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Cancle <NotAllowedIcon />
        </Button>
      </Box>
    </>
  );
};

export default AddProduct;
