import validateInput from "./validateInput";
import { Dispatch } from "react";
import {
  FormState,
  UpdateFormAction,
  FormField,
} from "../types/platfromsTypes";
export const UPDATE_FORM = "UPDATE_FORM";
// in this page we get the error message from the inialState opjects if it found and validate on every char the user write

// the name is the field name and the value is the value that user write in  filed name
export const onInputChange = (
  name: string,
  value: string,
  dispatch: Dispatch<UpdateFormAction>,
  state: FormState,
  mode: boolean,
  isIntegrated: boolean
) => {
  const { hasError, error } = validateInput(name, value, mode, isIntegrated);

  let isFormValid = true;
  // for loop on every initialState item to check if there are any harErorr is true
  // to make the from not valid
  for (const i in state) {
    const item = state[i as keyof FormState] as FormField;
    // Check if the current field has error
    if (i === name && hasError) {
      isFormValid = false;
      break;
    } else if (i !== name && item.hasError) {
      // Check if any other field has error
      isFormValid = false;
      break;
    }
  }
  //  creating and sending an action to update the form state using the UPDATE_FORM
  // dispatch is a function send the new intialstate with the new values to the reducer
  dispatch({
    type: UPDATE_FORM,
    payload: { name, value, hasError, error, isFormValid },
  });
};
