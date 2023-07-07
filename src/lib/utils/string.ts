export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
4
export const REGEX_ONLY_LETTERS_NUMBERS_AND_SPACES = /^[a-zA-Z0-9 ]+$/
