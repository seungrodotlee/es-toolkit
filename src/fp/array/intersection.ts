import { intersection as intersectionToolkit } from '../../array/intersection';

/**
 * Returns the intersection of two arrays.
 *
 * This function takes two arrays and returns a new array containing the elements that are
 * present in both arrays. It effectively filters out any elements from the first array that
 * are not found in the second array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} firstArr - The first array to compare.
 * @param {T[]} secondArr - The second array to compare.
 * @returns {T[]} A new array containing the elements that are present in both arrays.
 *
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [3, 4, 5, 6, 7];
 * const result = intersection(array1, array2);
 * // result will be [3, 4, 5] since these elements are in both arrays.
 */
export function intersection<T>(firstArr: readonly T[], secondArr: readonly T[]): T[];

/**
 * Returns the intersection of two arrays.
 *
 * This function takes two arrays and returns a new array containing the elements that are
 * present in both arrays. It effectively filters out any elements from the first array that
 * are not found in the second array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} secondArr - The second array to compare.
 * @returns {(firstArr: T[]) => T[]} A function that receive the first array to compare as argument and returns a new array containing the elements that are present in both arrays.
 *
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [3, 4, 5, 6, 7];
 * const result = intersection(array2)(array1);
 * // result will be [3, 4, 5] since these elements are in both arrays.
 */
export function intersection<T>(secondArr: readonly T[]): (firstArr: readonly T[]) => T[];

export function intersection<T>(firstArrOrSecondArr: readonly T[] | readonly T[], secondArr?: readonly T[]) {
  if (secondArr == null) {
    return (firstArr: readonly T[]) => intersection(firstArr, firstArrOrSecondArr as readonly T[]);
  }

  const firstArr = firstArrOrSecondArr as readonly T[];
  return intersectionToolkit(firstArr, secondArr);
}
