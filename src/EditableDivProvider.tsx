import { ReactNode, createContext, useContext, useState } from "react";


type EditableDivContextType = {
  register: (divLabel: string | string[], getText: () => string) => void,
  getValues: () => Record<string, string>,
};
const EditableDivContext = createContext<EditableDivContextType | null>(null);

type EditableDivProviderProps = {
  children?: ReactNode
}
export const EditableDivProvider = ({ children }: EditableDivProviderProps) => {
  const [getTextFuncs, setGetTextFuncs] = useState<Record<string, () => string>>({});

  const register = (divLabel: string | string[], getText: () => string) => {
    setGetTextFuncs((prev) => {
      let updatedFuncs = { ...prev };

      if (typeof divLabel === 'string') {
        updatedFuncs[divLabel] = getText;
      } else if (Array.isArray(divLabel)) {
        divLabel.reduce((acc: Record<string, any>, currentDivLabel: string, index: number) => {
          if (index === divLabel.length - 1) {
            acc[currentDivLabel] = getText;
          } else {
            if (!acc[currentDivLabel]) acc[currentDivLabel] = {};
          }
          return acc[currentDivLabel];
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
    <EditableDivContext.Provider value={{ register, getValues }}>
      {children}
    </EditableDivContext.Provider>
  );
};

export const useEditableDiv = () => {
  const context = useContext(EditableDivContext);
  if (!context) {
    throw new Error("useEditableDiv must be used within EditableDivProvider");
  }
  return context;
};
