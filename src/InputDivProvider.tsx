import { ReactNode, createContext, useContext, useState } from "react";


type InputDivContextType = {
  register: (inputKey: string | string[], getText: () => string) => void,
  getValues: () => Record<string, string>,
};
const InputDivContext = createContext<InputDivContextType | null>(null);

type InputDivProviderProps = {
  children?: ReactNode
}
export const InputDivProvider = ({ children }: InputDivProviderProps) => {
  const [getTextFuncs, setGetTextFuncs] = useState<Record<string, () => string>>({});

  const register = (inputKey: string | string[], getText: () => string) => {
    setGetTextFuncs((prev) => {
      let updatedFuncs = { ...prev };

      if (typeof inputKey === 'string') {
        updatedFuncs[inputKey] = getText;
      } else if (Array.isArray(inputKey)) {
        inputKey.reduce((acc: Record<string, any>, currentInputKey: string, index: number) => {
          if (index === inputKey.length - 1) {
            acc[currentInputKey] = getText;
          } else {
            if (!acc[currentInputKey]) acc[currentInputKey] = {};
          }
          return acc[currentInputKey];
        }, updatedFuncs);
      }
  
      return updatedFuncs;
    });
  };


  type Object = Record<string, any>;
  const extractValues = (obj: Object): Object => {
    return Object.entries(obj).reduce((values, [key, value]) => {
      values[key] = typeof value === 'function' ? value() : extractValues(value);
      return values;
    }, {} as Object);
  };

  const getValues = () => {
    return extractValues(getTextFuncs);
  }

  return (
    <InputDivContext.Provider value={{ register, getValues }}>
      {children}
    </InputDivContext.Provider>
  );
};

export const useInputDiv = () => {
  const context = useContext(InputDivContext);
  if (!context) {
    throw new Error("useInputDiv must be used within InputDivProvider");
  }
  return context;
};
