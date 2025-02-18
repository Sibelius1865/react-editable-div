import { createContext, useContext } from "react";
import { Parser } from "@/types";

type InputDivContextType = {
  getValues: (label: string) => Record<string, any>;
  registerParser: (label: string, inputKeyStr: string, parser: Parser) => void;
  providerLabel: string;
  providerIsEditing: boolean;
};
export const InputDivContext = createContext<InputDivContextType | null>(null);

export const useInputDivContext = () => {
  const context = useContext(InputDivContext);
  if (!context) {
    throw new Error("registerInputDiv must be used within InputDivProvider");
  }
  return context;
};
