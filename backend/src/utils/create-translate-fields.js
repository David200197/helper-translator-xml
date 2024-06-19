export const createTranslateFields = (en, es) => {

    const enTranslate = en.elements[0].elements.filter(el => el.elements)
    const esTranslate = es.elements[0].elements.filter(el => el.elements)

    const translateFields = enTranslate
        .map(({ name, elements }, index) => ({
            name,
            en: elements[0].text ?? "",
            es: esTranslate[index].elements[0].elements ?? ""
        }))
    return translateFields
}