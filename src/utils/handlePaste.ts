import { ClipboardEvent } from "react";

export const handlePaste = (
  e: ClipboardEvent<HTMLDivElement>,
  updateValue?: (value: string) => void
) => {
  e.preventDefault();
  const text = e.clipboardData.getData("text/plain");
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) throw new Error("paste error");
  selection.deleteFromDocument();
  selection.getRangeAt(0).insertNode(document.createTextNode(text));

  updateValue?.(text);
};
