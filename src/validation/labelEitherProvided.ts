const labelEitherProvided = (sharedLabel?: string, label?: string): string => {
  if (label) {
    return label;
  }
  if (sharedLabel) {
    return sharedLabel;
  }
  throw new Error(
    'Either "label" of "InputsScope" or "InputDiv/InputSpan" is required but was not provided.'
  );
};

export default labelEitherProvided;
