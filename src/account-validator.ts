export function validate(accountNumber: string) {
    const checksum = accountNumber
        .split('')
        .reverse()
        .map(digit => parseInt(digit, 10))
        .reduce((acc, currentValue, index) => acc + currentValue * (index + 1), 0);

    return checksum % 11 === 0;
}
