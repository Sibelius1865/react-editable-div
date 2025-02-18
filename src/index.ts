export { InputDiv } from "@/components/InputDiv";
export { InputDivProvider } from "@/components/InputDivProvider";
export { v } from "@/components/v";

import { useInputDivContext } from "@/contexts/InputDivContext";
export const useInputDiv = () => useInputDivContext().getValues;
