type TCollection<T = any> = Set<T> | T[] | ArrayLike<T>;
type TReturnType<T, U> = U extends Set<T> | T[] ? U : T[];

export type union<T> = (
  a: TCollection<T>,
  b: TCollection<T>
) => TReturnType<T, TCollection<T>>;

export type intersection<T> = (
  a: TCollection<T>,
  b: TCollection<T>
) => TReturnType<T, TCollection<T>>;

export type difference<T> = (
  a: TCollection<T>,
  b: TCollection<T>
) => TReturnType<T, TCollection<T>>;

export type symmetricDifference<T> = (
  a: TCollection<T>,
  b: TCollection<T>
) => TReturnType<T, TCollection<T>>;

export type includes<T> = (a: TCollection<T>, b: TCollection<T>) => boolean;

export type map<T> = (
  a: TCollection<T>,
  cb: (value: T) => T
) => TReturnType<T, TCollection<T>>;

export type filter<T> = (
  a: TCollection<T>,
  cb: (value: T) => boolean
) => TReturnType<T, TCollection<T>>;
