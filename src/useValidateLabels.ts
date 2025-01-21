import { useState } from "react";

type LabelType = string | string[];


const isPathContained = (treePath: string[], targetPath: string[]): boolean => {
  return targetPath.every((val, index) => val === treePath[index]);
}
const hasOverlap = (path1: string[], path2: string[]): boolean => {
  return path1.length > path2.length ? isPathContained(path1, path2) : isPathContained(path2, path1);
}

const isLabelConflict = (existingLabel: LabelType, newLabel: LabelType): boolean => {
  console.log(existingLabel, newLabel)
  if (typeof existingLabel === "string" && typeof newLabel === "string") {
    return existingLabel === newLabel;
  }
  if (Array.isArray(existingLabel) && Array.isArray(newLabel)) {
    return hasOverlap(existingLabel, newLabel);
  }
  if (typeof existingLabel === "string" && Array.isArray(newLabel)) {
    return existingLabel === newLabel[0];
  }
  if (Array.isArray(existingLabel) && typeof newLabel === "string") {
    return existingLabel[0] === newLabel;
  }
  return false;
}

export const useValidateLabels = () => {
  const [existingLabels, setExistingLabels] = useState<LabelType[]>([]);

  // const validateLabels = (newLabel: LabelType): void => {
  //   for (let existingLabel of existingLabels) {
  //     console.log('existingLabel', existingLabel)

  //     if (isLabelConflict(existingLabel, newLabel)) {
  //       throw new Error(`Duplicate label detected: ${JSON.stringify(newLabel)} and ${JSON.stringify(newLabel)}`);
  //     }
  //   }
  //   setExistingLabels(prev => [...prev, newLabel]);
  // };
  const validateLabels = () => {
    console.log(existingLabels)
  }

  return validateLabels;
}