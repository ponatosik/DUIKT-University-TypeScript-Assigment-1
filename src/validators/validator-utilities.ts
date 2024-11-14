/* eslint-disable */

// Utility types to create complex types for composite validator

// Any is required to map type in TupelToUnion function
type AnyValidator = Validator<any>;

// Source https://ghaiklor.github.io/type-challenges-solutions/en/medium-tuple-to-union.html
type TupleToUnion<T extends ReadonlyArray<any>> = T[number];

// Source: https://stackoverflow.com/questions/46012987/generic-type-wrapping-in-typescript-for-tuples
type ExtractValue<T extends ReadonlyArray<AnyValidator>> = {
  [K in keyof T]: T[K] extends Validator<infer V> ? V : never;
};

type ExtractToUnion<T extends ReadonlyArray<AnyValidator>> = TupleToUnion<ExtractValue<T>>;
