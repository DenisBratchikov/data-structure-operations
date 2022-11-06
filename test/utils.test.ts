import {
  getInvalidValueErrMsg,
  getInvalidArgsErrMsg,
  isArrayLikeParams,
  isArrayLike,
  checkIsFunction,
} from '../src/utils';
import type { TCollection } from '../src/types';

function getArrayLikeObject() {
  return { 0: 'foo', 1: 'bar', length: 2 };
}

describe('getInvalidValueErrMsg', () => {
  it('should return string with passed value', () => {
    const value = 'test';
    expect(getInvalidValueErrMsg(value)).toEqual(
      expect.stringContaining(value)
    );
  });
});

describe('getInvalidArgsErrMsg', () => {
  it('should return string with both passed args', () => {
    const arg1 = 'foo';
    const arg2 = 'bar';
    const str = getInvalidArgsErrMsg(arg1, arg2);
    expect(str).toEqual(expect.stringContaining(arg1));
    expect(str).toEqual(expect.stringContaining(arg2));
  });
});

describe('isArrayLikeParams', () => {
  it('should return true when passing two arrays', () => {
    expect(isArrayLikeParams([1], [2])).toBe(true);
  });

  it('should return true when passing two array-like objects', () => {
    expect(isArrayLikeParams(getArrayLikeObject(), getArrayLikeObject())).toBe(
      true
    );
  });

  it('should return true when passing array and array-like object', () => {
    expect(isArrayLikeParams(getArrayLikeObject(), [1])).toBe(true);
  });

  it('should return false when passing something but not array or array-like', () => {
    expect(isArrayLikeParams(1, [1])).toBe(false);
    expect(isArrayLikeParams(getArrayLikeObject(), 'hello')).toBe(false);
  });
});

describe('isArrayLike', () => {
  it('should return true for array-like object', () => {
    expect(isArrayLike(getArrayLikeObject())).toBe(true);
  });

  it('should return false for simple object', () => {
    expect(isArrayLike({} as TCollection<unknown>)).toBe(false);
  });

  it('should return false for the object with 0 length', () => {
    expect(isArrayLike({ length: 0 })).toBe(false);
  });

  it('should return false for empty array-like object', () => {
    expect(isArrayLike({ length: 12 })).toBe(false);
  });
});

describe('checkIsFunction', () => {
  it('should return nothing when passing function', () => {
    expect(checkIsFunction(() => null)).toBeUndefined();
  });

  it('should throw an error when passing invalid value', () => {
    expect(() => checkIsFunction(null as unknown as Function)).toThrowError();
  });
});
