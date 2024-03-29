export const extractValuesObj = (obj: any) => {
  const nonNullValues: any[] = [];

  function recursiveExtract(current: any): void {
    if (typeof current === "object") {
      for (const key in current) {
        if (current[key] !== null) {
          recursiveExtract(current[key]);
        }
      }
    } else if (current !== null) {
      nonNullValues.push(current);
    }
  }

  recursiveExtract(obj);
  return nonNullValues;
};
