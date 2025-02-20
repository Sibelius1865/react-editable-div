import { ReactNode, useRef, useEffect } from "react";
import { useGetValues, useParser } from "../hooks";
import { InputsContext } from "../contexts/InputsContext";
import { GetValues } from "../types";

type InputsScopeProps = {
  children?: ReactNode;
  label?: string;
  isEditing?: boolean;
  setGetValues: (getValues: GetValues) => void;
};
export const InputsScope = ({
  children,
  label: sharedLabel = "",
  isEditing: sharedIsEditing = false,
  setGetValues,
}: InputsScopeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { registerParser, parserMap } = useParser();

  const { getValues } = useGetValues({
    containerRef,
    parserMap,
    sharedLabel,
  });
  useEffect(() => {
    setGetValues && setGetValues(() => getValues);
  }, [getValues]);

  return (
    <InputsContext.Provider
      value={{ getValues, registerParser, sharedLabel, sharedIsEditing }}
    >
      <div ref={containerRef}>{children}</div>
    </InputsContext.Provider>
  );
};
