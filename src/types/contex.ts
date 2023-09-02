import { FormState } from "./platfromsTypes";
import { createContext } from "react";
import initialState from "../components/AddProduct";

// createContext is a function from react
export const PlatformContext = createContext(initialState);
