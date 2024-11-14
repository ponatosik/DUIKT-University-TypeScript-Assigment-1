type ContentOperation<T extends BaseContent> = {
  operation: OperationType;
  content: PartialContent<T>;
};

// Partial content with required id
type PartialContent<T extends BaseContent> = Partial<Omit<T, 'id'>> & Pick<T, 'id'>;
