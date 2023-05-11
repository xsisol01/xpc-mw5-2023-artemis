import { getLoweredLetters } from "@/app/utils/getLoweredLetters";

export const isTextEqual = (first: string, second: string) => {
  return getLoweredLetters(first) === getLoweredLetters(second);
};
