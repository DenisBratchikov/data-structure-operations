function isArrayLike(item) {
  return (
    item &&
    typeof item === 'object' &&
    Reflect.has(item, 'length') &&
    typeof item.length === 'number' &&
    item.length > 0 &&
    item.length - 1 in item
  );
}

function checkIsFunction(value) {
  if (typeof value !== 'function') {
    throw new Error(`Invalid argument: ${value} is not first function`);
  }
}

function getInvalidValueErrMsg(value) {
  return `Invalid argument: ${value}! Expected "Set" / "Array" / "ArrayLike"`;
}

function getInvalidArgsErrMsg(first, second) {
  return `Invalid arguments. Expected ${first} and ${second} to be of the same type of "Set" / "Array" / "ArrayLike"`;
}

function isSets(first, second) {
  return first instanceof Set && second instanceof Set;
}

function isArrayLikeParams(first, second) {
  return (
    (Array.isArray(first) && Array.isArray(second)) ||
    (isArrayLike(first) && isArrayLike(second))
  );
}

module.exports = {
  getInvalidValueErrMsg,
  getInvalidArgsErrMsg,
  isSets,
  isArrayLikeParams,
  isArrayLike,
  checkIsFunction,
};
