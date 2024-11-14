type Versioned<T extends BaseContent> = T & {
  majorVersion: number;
  minorVersion?: number;
  patchVersion?: number;
  testingStage?: 'beta' | 'alpha' | 'rc';
};
