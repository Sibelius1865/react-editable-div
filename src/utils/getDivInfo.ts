const getText = (div: HTMLDivElement) => {
  if (!div) return "";

  return div.innerHTML
    .replace(/<div>/g, "\n")
    .replace(/<\/div>/g, "")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/&nbsp;/g, " ");
};

type DivInfo = {
  value: string;
  key: string | null;
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
