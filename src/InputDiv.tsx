import { useRef, useEffect, ReactNode, HTMLProps } from "react";
import { useInputDiv } from "./InputDivProvider";
import './style.css';


type InputDivProps = {
  children?: ReactNode,
  inputKey: string | string[],
  isEditing?: boolean,
  placeholder?: string,
  defaultValue?: string,
  parser?: (text: string) => any,
} & HTMLProps<HTMLDivElement>;

export const InputDiv = ({ children, inputKey, isEditing=true, placeholder='', defaultValue='', parser, ...props }: InputDivProps) => {
  const { register } = useInputDiv();
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getText = () => {
      const text = editableRef.current?.textContent || "";
      return parser ? parser(text) : text;
    }
    register(inputKey, getText);
  }, []);

  const editProps = {
    ref: editableRef,
    className: `${props.className} input-div`,
    contentEditable: isEditing,
    suppressContentEditableWarning: true,
    spellCheck: false,
    placeholder: placeholder,
    ...props
  }

  return (
    <div {...editProps}>{defaultValue || children}</div>
  );
};