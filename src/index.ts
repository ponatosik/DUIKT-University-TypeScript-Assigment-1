// Example of content types
const product: Product = {
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'draft',
  name: 'some product',
  availability: 'available',
  price: { amount: 10, currency: 'USD' }
};

// Example of versioned content
const versionedArticle: Versioned<Article> = {
  id: '2',
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),
  status: 'published',
  title: 'some article',
  content: 'blah blah blah...',
  majorVersion: 0,
  minorVersion: 1,
  patchVersion: 0,
  testingStage: 'beta'
};

const content: BaseContent[] = [product, versionedArticle];

// Example of content operations
const publishOperation: ContentOperation<Product> = {
  operation: 'publish',
  content: product
};

const archiveOperation: ContentOperation<Article> = {
  operation: 'archive',
  content: { id: versionedArticle.id }
};

const updateOperation: ContentOperation<Product> = {
  operation: 'update',
  content: {
    id: product.id,
    name: 'updated name',
    price: { amount: 400, currency: 'UAH' }
  }
};

// Example of permissions and access control
const readonlyPermission: Permission = {
  view: false,
  publish: false,
  update: false,
  archive: false
};

const publishEditPermission: Permission = {
  view: true,
  publish: true,
  update: true,
  archive: false
};

const allPermission: Permission = {
  view: true,
  publish: true,
  update: true,
  archive: true
};

const articlePermissionMatrix: PermissionMatrix = {
  admin: allPermission,
  editor: publishEditPermission,
  viewer: readonlyPermission
};

const articleAccessControll: AccessControll<Article> = {
  permissionMatrix: articlePermissionMatrix,
  checkAccess: (operation: ContentOperation<Article>, role: Role) =>
    articlePermissionMatrix[role][operation.operation]
};

const viewerCanArchiveArticle = articleAccessControll.checkAccess(archiveOperation, 'viewer');

// Example of validation
const productValidator: ProductValidator = {
  validate: (product: Product): ValidationResult => {
    const errors: string[] = [];
    if ((product?.price?.amount ?? 1) < 0) errors.push('Product price must be positive');
    if (product.availability == 'available' && product.price == null)
      errors.push('Available product must have a price');

    return errors.length === 0 ? { isValid: true } : { isValid: false, errors };
  }
};

const versionedArticleValidator: VersionedValidator<Article> = {
  validate: (article: Versioned<Article>): ValidationResult => {
    const errors: string[] = [];
    if (!Number.isInteger(article.majorVersion ?? 1)) errors.push('Major version must be integer');
    if (!Number.isInteger(article.minorVersion ?? 1)) errors.push('Minor version must be integer');
    if (!Number.isInteger(article.patchVersion ?? 1)) errors.push('Patch version must be integer');
    if ((article?.majorVersion ?? 1) < 0) errors.push('Major version must not be negative');
    if ((article?.minorVersion ?? 1) < 0) errors.push('Minor version must not be negative');
    if ((article?.patchVersion ?? 1) < 0) errors.push('Patch version must not be negative');

    return errors.length === 0 ? { isValid: true } : { isValid: false, errors };
  }
};

const compositeValidator = createCompositeValidator(productValidator, versionedArticleValidator);

compositeValidator.validate(product); // Valid
compositeValidator.validate(versionedArticle); // Valid

versionedArticle.majorVersion = -1.5;
compositeValidator.validate(versionedArticle); // Errors: ["Major version must be integer", "Major version must not be negative"]
