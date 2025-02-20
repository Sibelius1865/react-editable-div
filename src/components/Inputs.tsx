import { useInputBase, InputProps } from "./inputBase";
import "../style.css";

export const InputDiv = (props: InputProps<HTMLDivElement>) => {
  const { editProps, defaultValue, children } =
    useInputBase<HTMLDivElement>(props);
  return <div {...editProps}>{defaultValue || children}</div>;
};

export const InputSpan = (props: InputProps<HTMLSpanElement>) => {
  const { editProps, defaultValue, children } =
    useInputBase<HTMLSpanElement>(props);
  return <span {...editProps}>{defaultValue || children}</span>;
};
