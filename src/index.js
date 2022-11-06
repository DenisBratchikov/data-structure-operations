const {
  isArrayLike,
  isSets,
  isArrayLikeParams,
  checkIsFunction,
  getInvalidValueErrMsg,
  getInvalidArgsErrMsg,
} = require('./utils');

function getSetFromArrayLikeObject(data) {
  const result = new Set();
  for (let i = 0; i < data.length; i++) {
    result.add(data[i]);
  }
  return result;
}

const union = (first, second) => {
  if (isSets(first, second)) {
    const result = new Set(first);
    second.forEach((value) => result.add(value));
    return result;
  }

  if (isArrayLikeParams(first, second)) {
    const result = getSetFromArrayLikeObject(first);
    for (let i = 0; i < second.length; i++) {
      result.add(second[i]);
    }
    return Array.from(result);
  }

  throw new Error(getInvalidArgsErrMsg(first, second));
};

const intersection = (first, second) => {
  if (isSets(first, second)) {
    const result = new Set();
    second.forEach((value) => first.has(value) && result.add(value));
    return result;
  }

  if (isArrayLikeParams(first, second)) {
    const set = getSetFromArrayLikeObject(first);
    const result = new Set();
    for (let i = 0; i < second.length; i++) {
      const value = second[i];
      set.has(value) && result.add(value);
    }
    return Array.from(result);
  }

  throw new Error(getInvalidArgsErrMsg(first, second));
};

const difference = (first, second) => {
  if (isSets(first, second)) {
    const result = new Set(first);
    second.forEach((value) => result.delete(value));
    return result;
  }

  if (isArrayLikeParams(first, second)) {
    const result = getSetFromArrayLikeObject(first);
    for (let i = 0; i < second.length; i++) {
      result.delete(second[i]);
    }
    return Array.from(result);
  }

  throw new Error(getInvalidArgsErrMsg(first, second));
};

const symmetricDifference = (first, second) => {
  if (isSets(first, second)) {
    const result = new Set(first);
    second.forEach((value) =>
      result.has(value) ? result.delete(value) : result.add(value)
    );
    return result;
  }

  if (isArrayLikeParams(first, second)) {
    return Array.from(
      symmetricDifference(
        getSetFromArrayLikeObject(first),
        getSetFromArrayLikeObject(second)
      )
    );
  }

  throw new Error(getInvalidArgsErrMsg(first, second));
};

const includes = (first, second) => {
  if (isSets(first, second)) {
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
      getSetFromArrayLikeObject(first),
      getSetFromArrayLikeObject(second)
    );
  }

  throw new Error(getInvalidArgsErrMsg(first, second));
};

const map = (data, cb) => {
  checkIsFunction(cb);

  if (data instanceof Set) {
    const result = new Set();
    data.forEach((value) => result.add(cb(value)));
    return result;
  }

  if (Array.isArray(data)) {
    return data.map(cb);
  }

  if (isArrayLike(data)) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(cb(data[i]));
    }
    return result;
  }

  throw new Error(getInvalidValueErrMsg(data));
};

const filter = (data, cb) => {
  checkIsFunction(cb);

  if (data instanceof Set) {
    const result = new Set();
    data.forEach((value) => cb(value) && result.add(value));
    return result;
  }

  if (Array.isArray(data)) {
    return data.filter(cb);
  }

  if (isArrayLike(data)) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      cb(item) && result.push(item);
    }
    return result;
  }
  throw new Error(getInvalidValueErrMsg(data));
};

module.exports = {
  union,
  intersection,
  difference,
  includes,
  symmetricDifference,
  map,
  filter,
};
