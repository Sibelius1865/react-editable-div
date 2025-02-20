import { useState, useContext, useEffect } from "react";
import { InputsContext } from "../contexts/InputsContext";
import { useGetValues } from "./useGetValues";
import { GetValues } from "../types";

type UseInputs = {
  getValues: GetValues;
  register: {
    setGetValues: (getValues: GetValues) => void;
  };
};
export const useInputs = (): UseInputs => {
  const context = useContext(InputsContext);

  const [getValues, setGetValues] = useState<GetValues>(() => () => ({}));
  const { getValues: _getValues } = useGetValues();

  useEffect(() => {
    if (context?.getValues) {
      setGetValues(() => context.getValues);
    } else {
      setGetValues(() => _getValues);
    }
  }, [context?.getValues]);

  return { getValues, register: { setGetValues } };
};
