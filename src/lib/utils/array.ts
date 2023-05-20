/**
 * Allows to filter out duplicate values from an array.
 * Chainable, and more convenient than using `[...new Set(myArray)]`
 *
 * Example: `mayArray.filter(onlyUnique)`;
 */
export function onlyUnique<T>(value: T, index: number, array: T[]): boolean {
  return array.indexOf(value) === index
}

/**
 * Allows to filter out duplicate tuples from an array.
 * Chainable, and more convenient than using `[...new Set(myArray)]`
 *
 * Example: `mayArray.filter(onlyUniqueTuples)`;
 */
export function onlyUniqueTuples<T>(value: T, index: number, array: T[]): boolean {
  return array.map((val) => JSON.stringify(val)).indexOf(JSON.stringify(value)) === index
}
