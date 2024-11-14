type Validator<T> = {
  validate: (data: T) => ValidationResult;
};
