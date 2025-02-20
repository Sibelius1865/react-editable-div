import { useContext } from "react";
import { InputsContext, initialContext } from "../contexts/InputsContext";

export const useInputsContext = () => {
  const context = useContext(InputsContext);
  if (!context) {
    return { ...initialContext, hasContext: false };
  }
  return { ...context, hasContext: true };
};
