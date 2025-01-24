export const setNestedValue = (obj: Record<string, any>, path: string, value: any): Record<string, any> => {
  const keys = path.split('.');
  let current = obj;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = current[key] || {};
      current = current[key];
    }
  });

  return obj;
};