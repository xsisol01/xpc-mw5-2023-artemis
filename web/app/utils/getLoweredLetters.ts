export const getLoweredLetters = (text: string) => {
  return text
    .replace(' ', '')
    .replace(`'`, '')
    .replace(/[^a-zA-Z]/g, '')
    .toLowerCase()
}