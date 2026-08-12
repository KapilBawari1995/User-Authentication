
// =====================================================
// GET MODULE PERMISSION
// =====================================================

export const getModulePermission = (
  permissions,
  moduleName
) => {
  if (!Array.isArray(permissions)) {
    return null;
  }

  return (
    permissions.find(
      (permission) =>
        permission?.module?.toLowerCase() ===
        moduleName?.toLowerCase()
    ) || null
  );
};

// =====================================================
// CHECK PERMISSION
// =====================================================

export const hasPermission = (
  permissions,
  moduleName,
  action
) => {
  const permission = getModulePermission(
    permissions,
    moduleName
  );

  return Boolean(permission?.[action]);
};
