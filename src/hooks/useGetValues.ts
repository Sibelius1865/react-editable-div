import { useCallback } from "react";
import { getDivInfo, setNestedValue } from "../utils";
import { GetValues } from "../types";
import validate from "../validation";

type Params = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  sharedLabel: string;
  parserMap: Record<string, Record<string, any>>;
};
const defaultParams: Params = {
  containerRef: { current: null },
  sharedLabel: "",
  parserMap: {},
};

type UseGetValues = {
  getValues: GetValues;
};
export const useGetValues = (params: Params = defaultParams): UseGetValues => {
  const { containerRef, sharedLabel, parserMap } = params;

  const getValues = useCallback(
    (label: string = sharedLabel) => {
      const targetElement = containerRef.current || document;
      const divInfo = validate.divInfo(getDivInfo(targetElement, label));
      const values = divInfo.reduce((acc, item) => {
        const { key, value } = item;
        const parsedValue = parserMap[label]?.[key]
          ? parserMap[label][key](value)
          : value;
        return setNestedValue(acc, key, parsedValue);
      }, {});
      return values;
    },
    [containerRef, sharedLabel, parserMap]
  );

  return { getValues };
};
