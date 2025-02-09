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
    value: div.textContent || "",
    key: div.dataset.inputKey || null,
  }));
};
