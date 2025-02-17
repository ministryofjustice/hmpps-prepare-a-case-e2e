export const countSuffix = (value: number) => {
    const lastNumeric = value.toString().at(value.toString().length - 1)
    switch(lastNumeric) {
        case '1':
            return `${value}st`
        case '2':
            return `${value}nd`
        case '3':
            return `${value}rd`
        default:
            return `${value}th`
    }
}