import { UPDATE_FORM } from "../utils/formutils";
import { FormState, UpdateFormAction } from "../types/platfromsTypes";
// this functions is my reducer
// here we collect all the information that we have in the fields to use them
// we fll the inialState Object here
const formsReducer = (state: FormState, action: UpdateFormAction) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, error, touched, isFormValid } =
        action.payload;

      return {
        ...state,
        [name]: { ...state, value, hasError, error, touched },
        isFormValid,
      };
    default:
      return state;
  }
};
export default formsReducer;
// ...state[name]
