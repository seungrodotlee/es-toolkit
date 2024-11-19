import { mapKeys as mapKeysToolkit } from '../../object/mapKeys';

/**
 * Creates a new object with the same values as the given object, but with keys generated
 * by running each own enumerable property of the object through the iteratee function.
 *
 * @template T - The type of the object.
 * @template K1 - The type of the keys in the object.
 * @template K2 - The type of the new keys generated by the iteratee function.
 *
 * @param {T} object - The object to iterate over.
 * @param {(value: T[K1], key: K1, object: T) => K2} getNewKey - The function invoked per own enumerable property.
 * @returns {Record<K2, T[K1]>} - Returns the new mapped object.
 *
 * @example
 * // Example usage:
 * const obj = { a: 1, b: 2 };
 * const result = mapKeys(obj, (value, key) => key + value);
 * console.log(result); // { a1: 1, b2: 2 }
 */
export function mapKeys<T extends object, K1 extends keyof T, K2 extends PropertyKey>(
  object: T,
  getNewKey: (value: T[K1], key: K1, object: T) => K2
): Record<K2, T[K1]>;

/**
 * Creates a new object with the same values as the given object, but with keys generated
 * by running each own enumerable property of the object through the iteratee function.
 *
 * @template K1 - The type of the keys in the object.
 * @template V - The type of the values in the object.
 * @template K2 - The type of the new keys generated by the iteratee function.
 *
 * @param {(value: V, key: K1, object: Record<K1, V>) => K2} getNewKey - The function invoked per own enumerable property.
 * @returns {(object: Record<K1, V>) => Record<K2, V>} A function that receive the object to iterate over as argument and returns - Returns the new mapped object.
 *
 * @example
 * // Example usage:
 * const obj = { a: 1, b: 2 };
 * const result = mapKeys((value, key) => key + value)(obj);
 * console.log(result); // { a1: 1, b2: 2 }
 */
export function mapKeys<K1 extends string | number, V extends any, K2 extends PropertyKey>(
  getNewKey: (value: V, key: K1, object: Record<K1, V>) => K2
): (object: Record<K1, V>) => Record<K2, V>;

export function mapKeys<T extends object, K1 extends keyof T, K2 extends PropertyKey>(
  objectOrGetNewKey: T | ((value: T[K1], key: K1, object: T) => K2),
  getNewKey?: (value: T[K1], key: K1, object: T) => K2
) {
  if (getNewKey == null) {
    return (object: T) => mapKeys(object, objectOrGetNewKey as (value: T[K1], key: K1, object: T) => K2);
  }

  const object = objectOrGetNewKey as T;
  return mapKeysToolkit(object, getNewKey);
}
