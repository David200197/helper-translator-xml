export const updateEs = (es, name, value) => {
    const index = es.elements[0].elements.findIndex(el => el?.name === name)
    if (index < 0) return false
    es.elements[0].elements[index].elements[0].text = value
    return true
}