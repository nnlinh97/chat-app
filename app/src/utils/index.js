export const findIndex = (array, id) => {
    let result = -1;
    array.forEach((element, index) => {
        if (element.id === id) {
            result = index;
        }
    });
    return result;
}