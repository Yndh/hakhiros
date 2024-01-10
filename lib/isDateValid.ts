export function dateIsValid(date: Date) {
    return date instanceof Date && !isNaN(date.getTime());
}
