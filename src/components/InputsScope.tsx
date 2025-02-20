import { ReactNode, useRef, useEffect } from "react";
import { useGetValues, useParser } from "../hooks";
import { InputsContext } from "../contexts/InputsContext";
import { GetValues } from "../types";

type InputsScopeProps = {
  children?: ReactNode;
  setGetValues?: (getValues: GetValues) => void;
  label?: string;
  isEditing?: boolean;
  isPreservingStyle?: boolean;
};
export const InputsScope = ({
  children,
  setGetValues,
  label = "",
  isEditing = false,
  isPreservingStyle = false,
}: InputsScopeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { registerParser, parserMap } = useParser();

  const { getValues } = useGetValues({
    containerRef,
    parserMap,
    sharedLabel: label,
  });
  useEffect(() => {
    setGetValues && setGetValues(() => getValues);
  }, [getValues]);

  const sharedProps = {
    sharedLabel: label,
    sharedIsEditing: isEditing,
    sharedIsPreservingStyle: isPreservingStyle,
  };

  return (
    <InputsContext.Provider
      value={{
        getValues,
        registerParser,
        sharedProps,
      }}
    >
      <div ref={containerRef}>{children}</div>
    </InputsContext.Provider>
  );
};
