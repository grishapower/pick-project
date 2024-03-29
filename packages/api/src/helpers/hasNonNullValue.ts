export const hasNonNullValue = (obj: any) => {
  for (const key in obj) {
    if (obj[key] !== null && typeof obj[key] !== "object") {
      return true;
    } else if (typeof obj[key] === "object" && hasNonNullValue(obj[key])) {
      return true;
    }
  }
  return false;
};
