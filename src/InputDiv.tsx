import { ReactNode, HTMLProps, useEffect } from "react";
import { useInputDivContext } from "./InputDivProvider";
import { handlePaste } from "./utils";
import validate from "./validation";
import "./style.css";

type InputDivProps = {
  children?: ReactNode;
  label?: string;
  inputKey: string | string[];
  isEditing?: boolean;
  isPreservingStyle?: boolean;
  placeholder?: string;
  defaultValue?: string;
  parser?: (text: string) => any;
} & HTMLProps<HTMLDivElement>;

export const InputDiv = ({
  children,
  label: propLabel,
  inputKey,
  isEditing = true,
  isPreservingStyle = false,
  placeholder = "",
  defaultValue = "",
  parser,
  ...props
}: InputDivProps) => {
  const inputKeyStr = Array.isArray(inputKey) ? inputKey.join(".") : inputKey;

  const { registerParser, providerLabel, providerIsEditing } =
    useInputDivContext();
  const label = validate.label(providerLabel, propLabel);

  useEffect(() => parser && registerParser(label, inputKeyStr, parser), []);

  const editProps = {
    ...props,
    className: `input-div ${props.className}`,
    contentEditable: providerIsEditing || isEditing,
    suppressContentEditableWarning: true,
    spellCheck: false,
    onPaste: isPreservingStyle ? undefined : handlePaste,
    placeholder: placeholder,
    "data-label": label,
    "data-input-key": inputKeyStr,
  };

  return <div {...editProps}>{defaultValue || children}</div>;
};
