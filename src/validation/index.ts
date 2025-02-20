import inputKeyNotNullabe from "./inputKeyNotNullabe";
import inputKeyNotConflicted from "./inputKeyNotConflicted";
import labelEitherProvided from "./labelEitherProvided";

type Validate = {
  divInfo: typeof inputKeyNotNullabe;
  label: typeof labelEitherProvided;
};
const validate: Validate = {
  divInfo: (divInfo) => inputKeyNotConflicted(inputKeyNotNullabe(divInfo)),
  label: labelEitherProvided,
};

export default validate;
