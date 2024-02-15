import { CurrPermsCtx } from "@/contexts/current_permission";
import { PermErrCtx } from "@/contexts/permission_error";
import Permissions from "@/data/permissions";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PermissionProtectorProps {
  children: ReactNode;
  permission?: Permissions[];
  silent?: boolean;
}

export const PermissionProtector: React.FC<PermissionProtectorProps> = ({ children, permission: required_permissions, silent }) => {
  const { grantedPermissions } = React.useContext(CurrPermsCtx);
  const { setFailedPermissions } = React.useContext(PermErrCtx);

  if (!required_permissions || required_permissions?.length === 0 || grantedPermissions === "*") return children;

  if (grantedPermissions) {
    const failedPerm = (required_permissions).filter((permission) => !grantedPermissions.includes(permission));
    if (failedPerm.length > 0) {
      if (!silent) setFailedPermissions(failedPerm);
      return <></>;
    } else {
      return children;
    }
  } else {
    return <Navigate to="/login?sessionExpired=true" />;
  }
};