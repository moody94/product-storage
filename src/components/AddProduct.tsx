import React, { useState, useReducer } from "react";
import { DownloadIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Input, Stack, Box, Button, Text, Select } from "@chakra-ui/react";
import validateInput from "../utils/validateInput";
import { onInputChange } from "../utils/formutils";
import formReducer from "../reducers/formReducer";
import {
  UPDATE_FORM,
  FormState,
  UpdateFormAction,
} from "../types/platfromsTypes";
export const addproduct = "/addproduct";

export const initialState = {
  productName: { value: "", touched: false, hasError: true, error: "" },
  productPrice: { value: "", touched: false, hasError: true, error: "" },
  productType: { value: "", touched: false, hasError: true, error: "" },
  isFormValid: false,
};

const AddProduct = () => {
  const navigate = useNavigate();

  // used like usestate but for many states
  // const [state, dispatch] = useReducer(formReducer, initialState);
  const [state, dispatch] = useReducer<
    React.Reducer<FormState, UpdateFormAction>
  >(formReducer, initialState);
  const [showError, setShowError] = useState(false);

  const setProductInfo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); //prevents the form from submitting
    let isFormValid = true;
    // loop throw the for loop after i fill it with new values
    for (const name in state) {
      const item = state[name as keyof FormState];
      const { value } = item;
      const { hasError, error } = validateInput(name, value, false);

      if (hasError) {
        isFormValid = false;
      }
      if (name) {
        dispatch({
          type: UPDATE_FORM,
          payload: {
            name,
            value,
            hasError,
            error,
            touched: true,
            isFormValid,
          },
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
  //type represenet the name of the object element that i want to prosses
  // paylod represent the info that i want to send

  // if we compare the dispatch with a postnord transfer the packet represent the paylod the action is the transfare the address() is the type
  // if we compare the dispatch with a postnord transfer the packet represent the paylod. the action type points to the place the reciever should take the package (payload)

  return (
    <>
      <Box m={20}>
        <Text fontSize="3xl">Create a new product</Text>
        {showError && !state.isFormValid && (
          <div className="form_error">Please fill all the fields correctly</div>
        )}
        <Stack boxShadow="Base">
          <Input
            variant="filled"
            placeholder="Product"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange(
                "productName",
                e.target.value,
                dispatch,
                state,
                false
              )
            }
          />
          {state.productName.hasError && <Text>{state.productName.error}</Text>}
          <Input
            variant="filled"
            placeholder="Price"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange(
                "productPrice",
                e.target.value,
                dispatch,
                state,
                false
              )
            }
          />
          {state.productPrice.hasError && (
            <Text>{state.productPrice.error}</Text>
          )}

          <Select
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange(
                "productType",
                e.target.value,
                dispatch,
                state,
                false
              )
            }
            placeholder="Select your product Type"
          >
            <option value="Integrated">Integrated</option>
            <option value="Peripheral">Peripheral</option>
          </Select>
          {state.productType.hasError && <Text>{state.productType.error}</Text>}
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
