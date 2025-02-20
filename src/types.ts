import { ReactNode, HTMLProps } from "react";

export type Parser = (key: string) => any;

export type DivInfo = { value: string; key: string | null };
export type DivInfoStrict = { value: string; key: string };

export type GetValues = (label?: string) => Record<string, any>;

export type InputProps<T> = {
  children?: ReactNode;
  label?: string;
  inputKey: string | string[];
  isEditing?: boolean;
  isPreservingStyle?: boolean;
  placeholder?: string | number;
  defaultValue?: string | number;
  parser?: (text: string) => any;
} & HTMLProps<T>;
