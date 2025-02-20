import { useEffect } from "react";
import { useInputsContext } from "./useInputsContext";
import { handlePaste } from "../utils";
import { InputProps } from "../types";
import validate from "../validation";

export const useInputBase = <T extends HTMLElement>({
  children = null,
  label: propLabel,
  inputKey,
  isEditing = true,
  isPreservingStyle = false,
  placeholder = "",
  defaultValue = "",
  parser,
  ...props
}: InputProps<T>) => {
  const inputKeyStr = Array.isArray(inputKey) ? inputKey.join(".") : inputKey;

  const {
    registerParser,
    sharedLabel,
    sharedIsEditing = true,
  } = useInputsContext();
  const label = validate.label(sharedLabel, propLabel);

  useEffect(() => parser && registerParser?.(label, inputKeyStr, parser), []);

  const editProps = {
    ...props,
    className: `input-element ${props.className || ""}`,
    contentEditable: sharedIsEditing || isEditing,
    suppressContentEditableWarning: true,
    spellCheck: false,
    onPaste: isPreservingStyle ? undefined : handlePaste,
    placeholder: String(placeholder),
    "data-label": label,
    "data-input-key": inputKeyStr,
  };

  return { editProps, defaultValue, children };
};
