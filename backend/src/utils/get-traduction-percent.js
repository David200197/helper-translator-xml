import { getPercent } from "./get-percent.js";

export const getTraductionPercent = (es) => {
  const value = es.elements[0].elements.filter((el) => el.elements);
  const total = value.length;
  const current = value.filter((val) => val.elements[0].text).length;
  return getPercent(current, total);
};
