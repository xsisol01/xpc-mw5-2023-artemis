export const isValid = (min: string, max: string) => {

  if (Number(min) < 0 || Number(max) < 0) {
    return false
  }

  if (!min || !max) {
    return true
  }

  return max >= min
}