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
    hasContext,
    registerParser,
    sharedProps: { sharedLabel, sharedIsEditing, sharedIsPreservingStyle },
  } = useInputsContext();
  const label = validate.label(sharedLabel, propLabel);

  useEffect(() => {
    if (!parser) return;

    if (hasContext) {
      registerParser?.(label, inputKeyStr, parser);
    } else {
      console.error(
        "If you want to register a 'parser', please include it inside the 'InputsScope' component."
      );
    }
  }, []);

  const editProps = {
    ...props,
    className: `input-element ${props.className || ""}`,
    contentEditable: isEditing || sharedIsEditing,
    suppressContentEditableWarning: true,
    spellCheck: false,
    onPaste:
      isPreservingStyle && sharedIsPreservingStyle ? undefined : handlePaste,
    placeholder: String(placeholder),
    "data-label": label,
    "data-input-key": inputKeyStr,
  };

  return { editProps, defaultValue, children };
};
