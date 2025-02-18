import { DivInfo, DivInfoStrict } from "@/types";

const inputKeyNotNullabe = (divInfo: DivInfo[]): DivInfoStrict[] => {
  return divInfo.map((item) => {
    if (item.key === null) {
      throw new Error('The "key" property is required but was not provided.');
    }
    return {
      key: item.key,
      value: item.value,
    };
  });
};

export default inputKeyNotNullabe;
