import { DivInfo } from "@/types";

const getText = (div: HTMLDivElement): string => {
  if (!div) return "";

  const valueElement = div.querySelector("span[data-value]");
  const target = valueElement || div;

  return target.innerHTML
    .replace(/<div>/g, "\n")
    .replace(/<\/div>/g, "")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/&nbsp;/g, " ");
};

export const getDivInfo = (
  container: HTMLElement | null,
  label: string
): DivInfo[] => {
  if (!container) return [];

  const selector = `div[data-label="${label}"]`;
  const targetDivs = container.querySelectorAll<HTMLDivElement>(selector);
  return Array.from(targetDivs).map((div) => ({
    value: getText(div),
    key: div.dataset.inputKey || null,
  }));
};
