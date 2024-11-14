interface AccessControll<T extends BaseContent> {
  permissionMatrix: PermissionMatrix;
  checkAccess: (operation: ContentOperation<T>, role: Role) => boolean;
}
