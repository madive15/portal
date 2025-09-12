export const isNull = (value: unknown): boolean => {
  if (
    value === null ||
    value === undefined ||
    value === 'null' ||
    value === 'undefined'
  ) {
    return true;
  }

  if (typeof value === 'string') {
    return !(value.trim().length > 0);
  } else if (typeof value === 'number') {
    return isNaN(value);
  } else if (Array.isArray(value)) {
    return !(value.length > 0);
  } else if (typeof value === 'object') {
    return !(Object.keys(value).length > 0);
  }

  return true;
};
