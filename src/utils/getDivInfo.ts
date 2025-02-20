import { DivInfo } from "../types";

const getText = (element: HTMLElement): string => {
  if (!element) return "";

  return element.innerHTML
    .replace(/<div>/g, "\n")
    .replace(/<\/div>/g, "")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/&nbsp;/g, " ");
};

export const getDivInfo = (
  container: HTMLElement | Document,
  label: string
): DivInfo[] => {
  if (!container) return [];

  const selector = `[data-label="${label}"]`;
  const targetDivs = container.querySelectorAll<HTMLElement>(selector);
  return Array.from(targetDivs).map((element) => ({
    value: getText(element),
    key: element.dataset.inputKey || null,
  }));
};
