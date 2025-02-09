export { InputDiv } from "./InputDiv";
export { InputDivProvider } from "./InputDivProvider";

import { useInputDivContext } from "./InputDivProvider";
export const useInputDiv = () => useInputDivContext().getValues;
