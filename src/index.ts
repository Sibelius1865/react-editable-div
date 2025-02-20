export { InputDiv, InputSpan } from "./components/Inputs";
export { InputDivProvider } from "./components/InputDivProvider";

import { useInputDivContext } from "./contexts/InputDivContext";
export const useInputDiv = () => useInputDivContext().getValues;
