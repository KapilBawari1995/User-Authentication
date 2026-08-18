import { useSelector } from "react-redux";
import { hasPermission } from "../utils/permissionUtils";

const usePermissions = (moduleName) => {
  const user = useSelector(
    (state) => state.auth?.user
  );

  // Permissions can come from user.permissions
  // or role.permissions
  const permissions =
    user?.permissions ||
    user?.role?.permissions ||
    [];

  return {
    canView: hasPermission(
      permissions,
      moduleName,
      "view"
    ),

    canCreate: hasPermission(
      permissions,
      moduleName,
      "create"
    ),

    canEdit: hasPermission(
      permissions,
      moduleName,
      "edit"
    ),

    canDelete: hasPermission(
      permissions,
      moduleName,
      "delete"
    ),

    canAddMember: hasPermission(
      permissions,
      moduleName,
      "addMember"
    ),
  };
};

export default usePermissions;