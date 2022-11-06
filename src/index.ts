import {
  isArrayLike,
  isArrayLikeParams,
  checkIsFunction,
  getInvalidValueErrMsg,
  getInvalidArgsErrMsg,
} from './utils';
import type { TCollection } from './types';

function getSetFromArrayLikeObject<T>(data: ArrayLike<T>): Set<T> {
  const result = new Set<T>();
  for (let i = 0; i < data.length; i++) {
    result.add(data[i]);
  }
  return result;
}

export function union<T, U extends TCollection<T>>(first: U, second: U): U {
  if (first instanceof Set && second instanceof Set) {
    const result = new Set<T>(first);
    second.forEach((value) => result.add(value));
    return result as U;
  }

  if (isArrayLikeParams(first, second)) {
    const result = getSetFromArrayLikeObject(first as ArrayLike<T>);
    for (let i = 0; i < (second as ArrayLike<T>).length; i++) {
      result.add(second[i]);
    }
    return Array.from(result) as U;
  }

  throw new Error(getInvalidArgsErrMsg(first, second));
}

export function intersection<T, U extends TCollection<T>>(
  first: U,
  second: U
): U {
  if (first instanceof Set && second instanceof Set) {
    const result = new Set<T>();
    second.forEach((value) => first.has(value) && result.add(value));
    return result as U;
  }

  if (isArrayLikeParams(first, second)) {
    const set = getSetFromArrayLikeObject(first as ArrayLike<T>);
    const result = new Set<T>();
    for (let i = 0; i < (second as ArrayLike<T>).length; i++) {
      const value = second[i];
      set.has(value) && result.add(value);
    }
    return Array.from(result) as U;
  }

  throw new Error(getInvalidArgsErrMsg(first, second));
}

export function difference<T, U extends TCollection<T>>(
  first: U,
  second: U
): U {
  if (first instanceof Set && second instanceof Set) {
    const result = new Set(first);
    second.forEach((value) => result.delete(value));
    return result as U;
  }

  if (isArrayLikeParams(first, second)) {
    const result = getSetFromArrayLikeObject(first as ArrayLike<T>);
    for (let i = 0; i < (second as ArrayLike<T>).length; i++) {
      result.delete(second[i]);
    }
    return Array.from(result) as U;
  }

  throw new Error(getInvalidArgsErrMsg(first, second));
}

export function symmetricDifference<T, U extends TCollection<T>>(
  first: U,
  second: U
): U {
  if (first instanceof Set && second instanceof Set) {
    const result = new Set(first);
    second.forEach((value) =>
      result.has(value) ? result.delete(value) : result.add(value)
    );
    return result as U;
  }

  if (isArrayLikeParams(first, second)) {
    return Array.from(
      symmetricDifference(
        getSetFromArrayLikeObject(first as ArrayLike<T>),
        getSetFromArrayLikeObject(second as ArrayLike<T>)
      )
    ) as U;
  }

  throw new Error(getInvalidArgsErrMsg(first, second));
}

export function includes<T, U extends TCollection<T>>(
  first: U,
  second: U
): boolean {
  if (first instanceof Set && second instanceof Set) {
    if (second.size > first.size) return false;
    for (const value of second) {
      if (!first.has(value)) {
        return false;
      }
    }
    return true;
  }

  if (isArrayLikeParams(first, second)) {
    return includes(
      getSetFromArrayLikeObject(first as ArrayLike<T>),
      getSetFromArrayLikeObject(second as ArrayLike<T>)
    );
  }

  throw new Error(getInvalidArgsErrMsg(first, second));
}

export function map<T, U extends TCollection<T>>(
  data: U,
  cb: (value: T) => T
): U {
  checkIsFunction(cb);

  if (data instanceof Set) {
    const result = new Set<T>();
    data.forEach((value) => result.add(cb(value)));
    return result as U;
  }

  if (Array.isArray(data)) {
    return data.map(cb) as U;
  }

  if (isArrayLike(data)) {
    const result: T[] = [];
    for (let i = 0; i < data.length; i++) {
      result.push(cb(data[i]));
    }
    return result as U;
  }

  throw new Error(getInvalidValueErrMsg(data));
}

export function filter<T, U extends TCollection<T>>(
  data: U,
  cb: (value: T) => boolean
): U {
  checkIsFunction(cb);

  if (data instanceof Set) {
    const result = new Set<T>();
    data.forEach((value) => cb(value) && result.add(value));
    return result as U;
  }

  if (Array.isArray(data)) {
    return data.filter(cb) as U;
  }

  if (isArrayLike(data)) {
    const result: T[] = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      cb(item) && result.push(item);
    }
    return result as U;
  }
  throw new Error(getInvalidValueErrMsg(data));
}
