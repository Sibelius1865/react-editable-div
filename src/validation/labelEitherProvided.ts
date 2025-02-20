const labelEitherProvided = (providerLabel?: string, label?: string): string => {
  if (providerLabel) {
    return providerLabel;
  }
  if (label) {
    return label;
  }
  throw new Error('Either "label" of "InputDivProvider" or "InputDiv" is required but was not provided.');
}

export default labelEitherProvided;