import { TCollection } from './types';

export function isArrayLike<T>(item: TCollection<T>): boolean {
  if (!item || typeof item !== 'object' || !Reflect.has(item, 'length')) {
    return false;
  }
  const length: number = (item as ArrayLike<T>).length;
  return typeof length === 'number' && length > 0 && length - 1 in item;
}

export function checkIsFunction(value: Function): void | never {
  if (typeof value !== 'function') {
    throw new Error(`Invalid argument: ${value} is not first function`);
  }
}

export function getInvalidValueErrMsg<T>(value: TCollection<T>): string {
  return `Invalid argument: ${value}! Expected "Set" / "Array" / "ArrayLike"`;
}

export function getInvalidArgsErrMsg<T>(
  first: TCollection<T>,
  second: TCollection<T>
): string {
  return `Invalid arguments. Expected ${first} and ${second} to be of the same type of "Set" / "Array" / "ArrayLike"`;
}

export function isArrayLikeParams<T>(first, second: TCollection<T>): boolean {
  return (
    (Array.isArray(first) && Array.isArray(second)) ||
    (isArrayLike(first) && isArrayLike(second))
  );
}
