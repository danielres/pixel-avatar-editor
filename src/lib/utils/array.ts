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

/**
 * Creates a collection of arrays/tuples from a single array.
 * source: https://stackoverflow.com/a/16758242/564632
 *
 * @param  array Original array
 * @param  groupSize Size of each group/tuple
 *
 * @example
 *  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...]
 *  const result = grouper(array, 2)
 *  // => [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], ...]
 */
export function grouper<A>(array: A[], groupSize: number): A[][] {
  const result = []
  let i = 0
  const n = array.length
  while (i < n) {
    result.push(array.slice(i, i + groupSize))
    i += groupSize
  }
  return result
}
