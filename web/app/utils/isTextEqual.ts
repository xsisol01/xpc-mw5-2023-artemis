export const isTextEqual = (first: string, second: string) => {
  return lowerText(first) === lowerText(second)
}

export const lowerText = (text: string) => {
  return text
    .replace(' ', '')
    .replace(`'`, '')
    .toLowerCase()
}