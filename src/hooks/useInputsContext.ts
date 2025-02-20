import { useContext } from "react";
import { InputsContext, defaultContext } from "../contexts/InputsContext";

export const useInputsContext = () => {
  const context = useContext(InputsContext);
  if (!context) {
    return defaultContext;
  }
  return context;
};
