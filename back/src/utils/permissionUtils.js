export const getPermission = (user, module) => {
  const permissions = user?.role?.permissions || [];

  return permissions.find(
    (permission) =>
      permission.module.toLowerCase() === module.toLowerCase()
  );
};

export const hasPermission = (
  user,
  module,
  action = "view"
) => {
  const permission = getPermission(user, module);

  return permission?.[action] === true;
};

export const getScope = (user, module) => {
  const permission = getPermission(user, module);

  return permission?.scope || "self";
};