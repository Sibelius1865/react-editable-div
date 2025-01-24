import { ReactNode, createContext, useContext, useState, useRef } from "react";
import { getDivInfo } from "./getDivInfo";
import { setNestedValue } from "./setNestedValue";
import validate from './validation';


type Parser = (key: string) => any;

type InputDivContextType = {
  getValues: (label: string) => Record<string, any>,
  registerParser: (label: string, inputKeyStr: string, parser: Parser) => void,
  providerLabel: string,
  providerIsEditing: boolean,
};
const InputDivContext = createContext<InputDivContextType | null>(null);

type InputDivProviderProps = {
  children?: ReactNode,
  label?: string,
  isEditing?: boolean,
}
export const InputDivProvider = ({ children, label: providerLabel = '', isEditing: providerIsEditing = false }: InputDivProviderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [parserMap, setParserMap] = useState<Record<string, Record<string, Parser>>>({});
  const registerParser = (label: string, inputKeyStr: string, parser: Parser) => {
    setParserMap((prev) => ({ ...prev, [label]: { [inputKeyStr]: parser } }))
  }

  const getValues = (label: string = providerLabel) => {
    const divInfo = validate.divInfo(getDivInfo(containerRef.current, label));
    const values = divInfo.reduce((acc, item) => {
      const { key, value } = item;
      const parsedValue = parserMap[label]?.[key] 
        ? parserMap[label][key](value) 
        : value;
      return setNestedValue(acc, key, parsedValue);
    }, {})
    return values;
  }

  return (
    <InputDivContext.Provider value={{ getValues, registerParser, providerLabel, providerIsEditing }}>
      <div ref={containerRef}>
        {children}
      </div>
    </InputDivContext.Provider>
  );
};

export const useInputDivContext = () => {
  const context = useContext(InputDivContext);
  if (!context) {
    throw new Error("registerInputDiv must be used within InputDivProvider");
  }
  return context;
};