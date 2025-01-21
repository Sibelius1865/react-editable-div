import { useRef, useEffect, ReactNode, HTMLProps } from "react";
import { useEditableDiv } from "./EditableDivProvider";
// import { useValidateLabels } from "./useValidateLabels";
import './style.css';


type EditableDivProps = {
  children?: ReactNode,
  divLabel: string | string[],
  isEditing?: boolean,
  placeholder?: string,
  defaultValue?: string,
  parser?: (text: string) => any,
} & HTMLProps<HTMLDivElement>;

export const EditableDiv = ({ children, divLabel, isEditing=true, placeholder='', defaultValue='', parser, ...props }: EditableDivProps) => {
  const { register } = useEditableDiv();
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getText = () => {
      const text = editableRef.current?.textContent || "";
      return parser ? parser(text) : text;
    }
    register(divLabel, getText);
  }, []);

  const editProps = {
    ref: editableRef,
    className: `${props.className} editable-div`,
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