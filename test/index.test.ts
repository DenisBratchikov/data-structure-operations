import {
  union,
  intersection,
  difference,
  includes,
  symmetricDifference,
  map,
  filter,
} from '../src';

interface TArrayLikeObject<T> {
  [key: number]: T;
  length: number;
}

function isEqualSetsByValues<T>(first: Set<T>, second: Set<T>): boolean {
  if (first.size !== second.size) return false;

  for (let val of first) {
    if (!second.has(val)) return false;
  }

  return true;
}

function getNumericData() {
  return {
    first: [0, 1, 2, 3],
    second: [2, 3, 4],
    union: [0, 1, 2, 3, 4],
    intersection: [2, 3],
    difference: [0, 1],
    symmetricDifference: [0, 1, 4],
    mapCb: (value) => value * 2,
    mapResult: [0, 2, 4, 6],
    filterCb: (value) => value % 2 === 1,
    filterResult: [1, 3],
  };
}

function getStringData() {
  return {
    first: ['a', 'b', 'c', 'd'],
    second: ['c', 'd', 'e'],
    union: ['a', 'b', 'c', 'd', 'e'],
    intersection: ['c', 'd'],
    difference: ['a', 'b'],
    symmetricDifference: ['a', 'b', 'e'],
    mapCb: (value) => value.toUpperCase(),
    mapResult: ['A', 'B', 'C', 'D'],
    filterCb: (value) => value < 'c',
    filterResult: ['a', 'b'],
  };
}

function getArrayLikeObject<T>(data: T[]): TArrayLikeObject<T> {
  const result: TArrayLikeObject<T> = { length: data.length };
  for (let i = 0; i < data.length; i++) {
    result[i] = data[i];
  }
  return result;
}

function getInvalidCollections(): [[any, any], [any, any], [any, any]] {
  return [
    ['hello', []],
    [{ foo: 'bar' }, new Set()],
    [null, []],
  ];
}

function getInvalidFnArgs(): [
  [any, any],
  [any, any],
  [any, any],
  [any, any],
  [any, any]
] {
  return [
    ['hello', () => null],
    [{ foo: 'bar' }, () => null],
    [null, () => null],
    [[1, 2, 3], {}],
    [[1, 2, 3], null],
  ];
}

describe('union', () => {
  it.each([getNumericData(), getStringData()])(
    'should return union of two arrays',
    (data) => {
      expect(union(data.first, data.second)).toEqual(data.union);
    }
  );

  it.each([getNumericData(), getStringData()])(
    'should return union of two sets',
    (data) => {
      const result = union(
        new Set<string | number>(data.first),
        new Set<string | number>(data.second)
      );
      const isEqual = isEqualSetsByValues(
        result,
        new Set<string | number>(data.union)
      );
      expect(isEqual).toBe(true);
    }
  );

  it.each([getNumericData(), getStringData()])(
    'should return union of two array-like objects',
    (data) => {
      const result = union(
        getArrayLikeObject<string | number>(data.first),
        getArrayLikeObject<string | number>(data.second)
      );
      expect(result).toEqual(data.union);
    }
  );

  it('should throw an error when passing invalid arguments', () => {
    getInvalidCollections().forEach((args) => {
      expect(() => union(...args)).toThrowError();
    });
  });
});

describe('intersection', () => {
  it.each([getNumericData(), getStringData()])(
    'should return intersection of two arrays',
    (data) => {
      expect(intersection(data.first, data.second)).toEqual(data.intersection);
    }
  );

  it.each([getNumericData(), getStringData()])(
    'should return intersection of two sets',
    (data) => {
      const result = intersection(
        new Set<string | number>(data.first),
        new Set<string | number>(data.second)
      );
      const isEqual = isEqualSetsByValues(
        result,
        new Set<string | number>(data.intersection)
      );
      expect(isEqual).toBe(true);
    }
  );

  it.each([getNumericData(), getStringData()])(
    'should return intersection of two array-like objects',
    (data) => {
      const result = intersection(
        getArrayLikeObject<string | number>(data.first),
        getArrayLikeObject<string | number>(data.second)
      );
      expect(result).toEqual(data.intersection);
    }
  );

  it('should throw an error when passing invalid arguments', () => {
    getInvalidCollections().forEach((args) => {
      expect(() => intersection(...args)).toThrowError();
    });
  });
});

describe('difference', () => {
  it.each([getNumericData(), getStringData()])(
    'should return difference of two arrays',
    (data) => {
      expect(difference(data.first, data.second)).toEqual(data.difference);
    }
  );

  it.each([getNumericData(), getStringData()])(
    'should return difference of two sets',
    (data) => {
      const result = difference(
        new Set<string | number>(data.first),
        new Set<string | number>(data.second)
      );
      const isEqual = isEqualSetsByValues(
        result,
        new Set<string | number>(data.difference)
      );
      expect(isEqual).toBe(true);
    }
  );

  it.each([getNumericData(), getStringData()])(
    'should return difference of two array-like objects',
    (data) => {
      const result = difference(
        getArrayLikeObject<string | number>(data.first),
        getArrayLikeObject<string | number>(data.second)
      );
      expect(result).toEqual(data.difference);
    }
  );

  it('should throw an error when passing invalid arguments', () => {
    getInvalidCollections().forEach((args) => {
      expect(() => difference(...args)).toThrowError();
    });
  });
});

describe('symmetricDifference', () => {
  it.each([getNumericData(), getStringData()])(
    'should return symmetricDifference of two arrays',
    (data) => {
      expect(symmetricDifference(data.first, data.second)).toEqual(
        data.symmetricDifference
      );
    }
  );

  it.each([getNumericData(), getStringData()])(
    'should return symmetricDifference of two sets',
    (data) => {
      const result = symmetricDifference(
        new Set<string | number>(data.first),
        new Set<string | number>(data.second)
      );
      const isEqual = isEqualSetsByValues(
        result,
        new Set<string | number>(data.symmetricDifference)
      );
      expect(isEqual).toBe(true);
    }
  );

  it.each([getNumericData(), getStringData()])(
    'should return symmetricDifference of two array-like objects',
    (data) => {
      const result = symmetricDifference(
        getArrayLikeObject<string | number>(data.first),
        getArrayLikeObject<string | number>(data.second)
      );
      expect(result).toEqual(data.symmetricDifference);
    }
  );

  it('should throw an error when passing invalid arguments', () => {
    getInvalidCollections().forEach((args) => {
      expect(() => symmetricDifference(...args)).toThrowError();
    });
  });
});

describe('includes', () => {
  it('should return true for two arrays if includes', () => {
    expect(includes([1, 2, 3], [3, 2])).toBe(true);
    expect(includes(['a', 'b', 'c'], ['a', 'c'])).toBe(true);
  });

  it('should return true for two sets if includes', () => {
    expect(includes(new Set([1, 2, 3]), new Set([3, 2]))).toBe(true);
    expect(includes(new Set(['a', 'b', 'c']), new Set(['a', 'c']))).toBe(true);
  });

  it('should return true for two array-like objects if includes', () => {
    expect(
      includes(getArrayLikeObject([1, 2, 3]), getArrayLikeObject([3, 2]))
    ).toBe(true);
    expect(
      includes(
        getArrayLikeObject(['a', 'b', 'c']),
        getArrayLikeObject(['a', 'c'])
      )
    ).toBe(true);
  });

  it('should return false for two arrays if not includes', () => {
    expect(includes([1, 2, 3], [2, 0])).toBe(false);
    expect(includes(['a', 'b', 'c'], ['a', 'c', 'd'])).toBe(false);
  });

  it('should return false for two sets if not includes', () => {
    expect(includes(new Set([1, 2, 3]), new Set([2, 0]))).toBe(false);
    expect(includes(new Set(['a', 'b', 'c']), new Set(['a', 'c', 'd']))).toBe(
      false
    );
  });

  it('should return false for two array-like objects if not includes', () => {
    expect(
      includes(getArrayLikeObject([1, 2, 3]), getArrayLikeObject([2, 0]))
    ).toBe(false);
    expect(
      includes(
        getArrayLikeObject(['a', 'b', 'c']),
        getArrayLikeObject(['a', 'c', 'd'])
      )
    ).toBe(false);
  });

  it('should throw an error when passing invalid arguments', () => {
    getInvalidCollections().forEach((args) => {
      expect(() => includes(...args)).toThrowError();
    });
  });
});

describe('map', () => {
  it.each([getNumericData(), getStringData()])(
    'should return new array by applying callback on every element of the passed array',
    (data) => {
      expect(map(data.first, data.mapCb)).toEqual(data.mapResult);
    }
  );

  it.each([getNumericData(), getStringData()])(
    'should return new set by applying callback on every element of the passed set',
    (data) => {
      const result = map(new Set<string | number>(data.first), data.mapCb);
      const isEqual = isEqualSetsByValues(
        result,
        new Set<string | number>(data.mapResult)
      );
      expect(isEqual).toBe(true);
    }
  );

  it.each([getNumericData(), getStringData()])(
    'should return new array by applying callback on every element of the passed array-like object',
    (data) => {
      const result = map(
        getArrayLikeObject<string | number>(data.first),
        data.mapCb
      );
      expect(result).toEqual(data.mapResult);
    }
  );

  it('should throw an error when passing invalid arguments', () => {
    getInvalidFnArgs().forEach((args) => {
      expect(() => map(...args)).toThrowError();
    });
  });
});

describe('filter', () => {
  it.each([getNumericData(), getStringData()])(
    'should return filtered array by applying callback on every element of the passed array',
    (data) => {
      expect(filter(data.first, data.filterCb)).toEqual(data.filterResult);
    }
  );

  it.each([getNumericData(), getStringData()])(
    'should return filtered set by applying callback on every element of the passed set',
    (data) => {
      const result = filter(
        new Set<string | number>(data.first),
        data.filterCb
      );
      const isEqual = isEqualSetsByValues(
        result,
        new Set<string | number>(data.filterResult)
      );
      expect(isEqual).toBe(true);
    }
  );

  it.each([getNumericData(), getStringData()])(
    'should return filtered array by applying callback on every element of the passed array-like object',
    (data) => {
      const result = filter(
        getArrayLikeObject<string | number>(data.first),
        data.filterCb
      );
      expect(result).toEqual(data.filterResult);
    }
  );

  it('should throw an error when passing invalid arguments', () => {
    getInvalidFnArgs().forEach((args) => {
      expect(() => filter(...args)).toThrowError();
    });
  });
});
