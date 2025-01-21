type Object = Record<string, any>;

export const extractValues = (obj: Object): Object => {
  return Object.entries(obj).reduce((values, [key, value]) => {
    values[key] = typeof value === 'function' ? value() : extractValues(value);
    return values;
  }, {} as Object);
};