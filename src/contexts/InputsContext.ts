import { createContext } from "react";
import { Parser } from "../types";

type InputsContextType = {
  getValues: (label?: string) => Record<string, any>;
  registerParser: (label: string, inputKeyStr: string, parser: Parser) => void;
  sharedProps: {
    sharedLabel: string;
    sharedIsEditing: boolean;
    sharedIsPreservingStyle: boolean;
  };
};

export const initialContext: InputsContextType = {
  getValues: () => ({}),
  registerParser: () => {},
  sharedProps: {
    sharedLabel: "",
    sharedIsEditing: true,
    sharedIsPreservingStyle: false,
  },
};

export const InputsContext = createContext<InputsContextType | null>(null);
