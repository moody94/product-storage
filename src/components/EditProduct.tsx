import React, { useState, useReducer, useEffect, ChangeEvent } from "react";
import { ArrowBackIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
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
import { initialState } from "./AddProduct";
export const Editproduct = "/editproduct/:productName";
import {
  UPDATE_FORM,
  FormState,
  UpdateFormAction,
  LocalStorageItems,
  FormField,
} from "../types/platfromsTypes";

const EditProduct = () => {
  const navigate = useNavigate();

  // useparams is an react router hook get all the parameters values
  // this state came from reducer
  const { productName } = useParams<{ productName?: any }>();
  const [state, dispatch] = useReducer<
    React.Reducer<FormState, UpdateFormAction>
  >(formReducer, initialState);
  const [showError, setShowError] = useState(false);
  const storageData = localStorage.getItem(productName);
  const [editProduct, setEditProduct] = useState<LocalStorageItems>(
    JSON.parse(localStorage.getItem(productName))
  );
  // const editProduct: LocalStorageItems =
  //   typeof storageData === "string" ? JSON.parse(storageData) : Any;

  // we used useEffect to fill the state with  product data from local storag if user does not fill in the forms
  useEffect(() => {
    if (state.productName.value == "") {
      onInputChange("productName", productName, dispatch, state, true);
    }
    if (state.productPrice.value == "") {
      onInputChange(
        "productPrice",
        editProduct?.productPrice,
        dispatch,
        state,
        true
      );
    }
    if (state.productType.value == "") {
      onInputChange(
        "productType",
        editProduct?.productType,
        dispatch,
        state,
        true
      );
    }
  }, [editProduct]);


  // get the valid input and the error if the inpit is
  const setProductName = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    let isFormValid = true;

    for (const name in state) {
      const item = state[name as keyof FormState];
      const { value } = item as FormField;
      const { hasError, error } = validateInput(name, value, true);

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
        productName,
        JSON.stringify({
          productPrice: state.productPrice.value,
          productType: state.productType.value,
        })
      );
      navigate("/");
    }

    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  // the Onchange functions
  const ProductTypeHandlar = (e: React.ChangeEvent<HTMLSelectElement>) =>
    onInputChange("productType", e.target.value, dispatch, state, true);

  const ProductPriceHandlar = (e: React.ChangeEvent<HTMLInputElement>) =>
    onInputChange("productPrice", e.target.value, dispatch, state, true);

  return (
    <>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        <ArrowBackIcon />
      </Button>
      <Box m={20}>
        <Text fontSize="3xl">Update Or Delete The Products Values</Text>
        <FormControl isInvalid={showError && !state.isFormValid}>
          <FormErrorMessage>
            Please fill all the fields correctly
          </FormErrorMessage>
        </FormControl>
        <Stack boxShadow="Base">
          <FormLabel>Product</FormLabel>
          <Input
            variant="filled"
            placeholder="Product"
            disabled
            defaultValue={productName}
          />
          <FormControl isInvalid={state.productPrice.hasError}>
            <FormLabel>Price</FormLabel>
            <Input
              variant="filled"
              placeholder="Price"
              onChange={ProductPriceHandlar}
              defaultValue={editProduct?.productPrice}
            />
            <FormErrorMessage>{state.productPrice.error}</FormErrorMessage>
          </FormControl>
          {/* when user add new chars to the price or type that will update the state */}
          <FormControl isInvalid={state.productType.hasError}>
            <FormLabel>Type</FormLabel>
            <Select
              onChange={ProductTypeHandlar}
              placeholder="Select your product Type"
              defaultValue={editProduct?.productType}
            >
              <option value="Integrated">Integrated</option>
              <option value="Peripheral">Peripheral</option>
            </Select>
            <FormErrorMessage>{state.productType.error}</FormErrorMessage>
          </FormControl>
        </Stack>
        <br></br>
        <Button colorScheme="green" onClick={setProductName}>
          Uppdate <RepeatIcon />
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            localStorage.removeItem(productName);
            navigate("/");
          }}
        >
          Delete <DeleteIcon />
        </Button>
      </Box>
    </>
  );
};

export default EditProduct;
