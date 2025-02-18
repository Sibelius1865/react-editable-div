import { ReactNode, useState, useRef } from "react";
import { InputDivContext } from "@/contexts/InputDivContext";
import { getDivInfo, setNestedValue } from "@/utils";
import validate from "@/validation";
import { Parser } from "@/types";

type InputDivProviderProps = {
  children?: ReactNode;
  label?: string;
  isEditing?: boolean;
};
export const InputDivProvider = ({
  children,
  label: providerLabel = "",
  isEditing: providerIsEditing = false,
}: InputDivProviderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [parserMap, setParserMap] = useState<
    Record<string, Record<string, Parser>>
  >({});
  const registerParser = (
    label: string,
    inputKeyStr: string,
    parser: Parser
  ) => {
    setParserMap((prev) => ({ ...prev, [label]: { [inputKeyStr]: parser } }));
  };

  const getValues = (label: string = providerLabel) => {
    const divInfo = validate.divInfo(getDivInfo(containerRef.current, label));
    const values = divInfo.reduce((acc, item) => {
      const { key, value } = item;
      const parsedValue = parserMap[label]?.[key]
        ? parserMap[label][key](value)
        : value;
      return setNestedValue(acc, key, parsedValue);
    }, {});
    return values;
  };

  return (
    <InputDivContext.Provider
      value={{ getValues, registerParser, providerLabel, providerIsEditing }}
    >
      <div ref={containerRef}>{children}</div>
    </InputDivContext.Provider>
  );
};
