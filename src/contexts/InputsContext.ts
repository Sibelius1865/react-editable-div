import { createContext } from "react";
import { Parser } from "../types";

type InputsContextType = {
  getValues: (label?: string) => Record<string, any>;
  registerParser: (label: string, inputKeyStr: string, parser: Parser) => void;
  sharedLabel: string;
  sharedIsEditing: boolean;
};

export const defaultContext: InputsContextType = {
  getValues: () => ({}),
  registerParser: () => {},
  sharedLabel: "",
  sharedIsEditing: true,
};

export const InputsContext = createContext<InputsContextType | null>(null);
