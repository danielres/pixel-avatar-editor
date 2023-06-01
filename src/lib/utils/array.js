/**
 * Allows to filter out duplicate values from an array.
 * Chainable, and more convenient than using `[...new Set(myArray)]`
 *
 * @example mayArray.filter(onlyUnique);
 *
 * @template T
 * @param {T} value
 * @param {number} index
 * @param {T[]} array
 * @return {boolean}
 */
export function onlyUnique(value, index, array) {
  return array.indexOf(value) === index
}

/**
 * Allows to filter out duplicate tuples from an array.
 * Chainable, and more convenient than using `[...new Set(myArray)]`
 *
 * @example myArray.filter(onlyUniqueTuples);
 *
 * @template T
 * @param {T} value
 * @param {number} index
 * @param {T[]} array
 * @return {boolean}
 */
export function onlyUniqueTuples(value, index, array) {
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
 *
 * @template A
 * @param {A[]} array original array
 * @param {number} groupSize Size of each group/tuple
 * @return {A[][]}
 */
export function grouper(array, groupSize) {
  const result = []
  let i = 0
  const n = array.length
  while (i < n) {
    result.push(array.slice(i, i + groupSize))
    i += groupSize
  }
  return result
}
