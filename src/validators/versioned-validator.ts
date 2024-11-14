type VersionedValidator<T> = T extends BaseContent ? Validator<Versioned<T>> : never;
