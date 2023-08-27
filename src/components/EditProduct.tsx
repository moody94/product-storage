import React, { useState, useReducer, useEffect, ChangeEvent } from "react";
import { ArrowBackIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Stack, Box, Button, Text, Select } from "@chakra-ui/react";
import validateInput from "../utils/validateInput";
import { onInputChange } from "../utils/formutils";
import formReducer from "../reducers/formReducer";
import {
  UPDATE_FORM,
  FormState,
  UpdateFormAction,
} from "../types/platfromsTypes";
import { initialState } from "./AddProduct";
export const Editproduct = "/editproduct/:productName";

const EditProduct = () => {
  const navigate = useNavigate();

  // useparams is an react router hook get all the parameters values
  const { productName } = useParams();
  // this state came from reducer
  const [state, dispatch] = useReducer<
    React.Reducer<FormState, UpdateFormAction>
  >(formReducer, initialState);
  const [showError, setShowError] = useState(false);
  console.log(state);

  let [editProduct, setEditProduct] = useState(
    JSON.parse(localStorage.getItem(productName))
  );

  // we used useEffect to fill the state with  product data from local storag if user does not fill in the forms
  useEffect(() => {
    if (state.productName.value == "") {
      onInputChange("productName", productName, dispatch, state, "edit");
    }
    if (state.productPrice.value == "") {
      onInputChange(
        "productPrice",
        editProduct?.productPrice,
        dispatch,
        state,
        "edit"
      );
    }
    if (state.productType.value == "") {
      onInputChange(
        "productType",
        editProduct?.productType,
        dispatch,
        state,
        "edit"
      );
    }
  }, [editProduct]);

  const setProductName = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    let isFormValid = true;

    for (const name in state) {
      const item = state[name as keyof FormState];
      const { value } = item;
      const { hasError, error } = validateInput(name, value, "edit");

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
        <Text fontSize="3xl">Update Or Delet The Products Values</Text>
        {showError && !state.isFormValid && (
          <div className="form_error">Please fill all the fields correctly</div>
        )}
        <Stack boxShadow="Base">
          <Input
            variant="filled"
            placeholder="Product"
            disabled
            defaultValue={productName}
          />
          {state.productName.hasError && <Text>{state.productName.error}</Text>}
          <Input
            variant="filled"
            placeholder="Price"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange("productPrice", e.target.value, dispatch, state)
            }
            defaultValue={editProduct?.productPrice}
          />
          {state.productPrice.hasError && (
            <Text>{state.productPrice.error}</Text>
          )}
          {/* when user add new chars to the price or type that will update the state */}
          <Select
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange("productType", e.target.value, dispatch, state)
            }
            placeholder="Select your product Type"
            defaultValue={editProduct?.productType}
          >
            <option value="Integrated">Integrated</option>
            <option value="Peripheral">Peripheral</option>
          </Select>
          {state.productType.hasError && <Text>{state.productType.error}</Text>}
        </Stack>
        <br></br>
        <Button colorScheme="green" onClick={setProductName}>
          Uppdate <RepeatIcon />
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            localStorage.removeItem(productName);
            navigate("");
          }}
        >
          Delete <DeleteIcon />
        </Button>
      </Box>
    </>
  );
};

export default EditProduct;
