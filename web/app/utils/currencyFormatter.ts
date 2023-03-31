export const currencyFormatter = (number: string | number): string => {
    return Number.parseFloat(number?.toString()).toLocaleString('cs-CZ', {style:"currency", currency:"CZK"})
}