export const getLoweredLetters = (text: string) => {
  return text
    .replace(" ", "")
    .replace(`'`, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
};
