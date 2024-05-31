export const convertEnToEmptyEs = (en) => {
  const es = structuredClone(en);
  for (let i = 0; i <= en.elements[0].elements.length - 1; i++) {
    const val = es.elements[0].elements[i].elements;
    if (!val) continue;
    es.elements[0].elements[i].elements = [{ ...val[0], text: "" }];
  }
  return es;
};
