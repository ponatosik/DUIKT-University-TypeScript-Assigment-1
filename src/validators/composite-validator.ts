// Function that creates composite validator
// Composite validator accepts data of all types that are compatible with base validators

function createCompositeValidator<T extends ReadonlyArray<AnyValidator>>(
  ...validators: T
): Validator<TupleToUnion<ExtractValue<T>>> {
  return {
    validate: (data: TupleToUnion<ExtractValue<T>>): ValidationResult => {
      const results: ValidationResult[] = validators.map((validator) => validator.validate(data));
      const errors: string[] = results
        .flatMap((result) => result?.errors)
        .filter((error) => error != null);

      return errors.length > 0 ? { isValid: false, errors } : { isValid: true };
    }
  };
}
