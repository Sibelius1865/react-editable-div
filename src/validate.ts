type DivInfo = { value: string, key: string | null };
type DivInfoStrict = { value: string, key: string };
const validateDivInfo = (divInfo: DivInfo[]): DivInfoStrict[] => {
  return divInfo.map((item) => {
    if (item.key === null) {
      throw new Error('The "key" property is required but was not provided.');
    }
    return {
      key: item.key,
      value: item.value,
    };
  });
}

const validateLabel = (providerLabel?: string, label?: string): string => {
  if (providerLabel) {
    return providerLabel;
  }
  if (label) {
    return label;
  }
  throw new Error('Either "label" of "InputDivProvider" or "InputDiv" is required but was not provided.');
}

type Validate = {
  divInfo: (divInfo: DivInfo[]) => DivInfoStrict[],
  label: (providerLabel?: string, label?: string) => string,
}
export const validate: Validate = {
  divInfo: validateDivInfo,
  label: validateLabel,
}