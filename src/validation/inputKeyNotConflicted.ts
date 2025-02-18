import { DivInfoStrict } from "../types";

const isPathContained = (treePath: string[], targetPath: string[]): boolean => {
  return targetPath.every((val, index) => val === treePath[index]);
};
const hasOverlap = (path1: string[], path2: string[]): boolean => {
  return path1.length > path2.length
    ? isPathContained(path1, path2)
    : isPathContained(path2, path1);
};

const isLabelConflict = (key1: string, key2: string) => {
  if (key1 === key2) {
    throw new Error(
      `The label "${key1}" conflicts with itself. Duplicate labels are not allowed.`
    );
  }
  const [key1Arr, key2Arr] = [key1, key2].map((item) => item.split("."));
  if (hasOverlap(key1Arr, key2Arr)) {
    throw new Error(
      `The labels "${key1Arr}" and "${key2Arr}" conflict with each other. Nested or overlapping labels are not allowed.`
    );
  }
};

const inputKeyNotConflicted = (divInfo: DivInfoStrict[]) => {
  const keys = divInfo.map((item) => item.key);
  const _ = keys.reduce((acc, item) => {
    return acc.some((it) => isLabelConflict(it, item)) ? [] : [...acc, item];
  }, [] as string[]);
  return divInfo;
};

export default inputKeyNotConflicted;
