import Permissions from "@/data/permissions";
import { appContext } from "@/public-protected routes/ProtectedRoute";
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

interface PermissionProtectorProps {
  children: ReactNode;
  permission?: Permissions[];
  silent?: boolean;
}

export const PermissionProtector: React.FC<PermissionProtectorProps> = ({ children, permission: required_permissions, silent } ) => {
  const context = useContext(appContext);
  const { permissions, setPermErr } = context;

  if (!required_permissions || required_permissions?.length === 0 || permissions === "*") return children;

  if (permissions) {
    const failedPerm = (required_permissions as Permissions[]).filter((permission: Permissions) => !permissions.includes(permission));
    if (failedPerm.length > 0) {
      if (!silent) setPermErr(failedPerm);
      return <></>;
    } else {
      return children;
    }
  } else {
    return <Navigate to="/login?sessionExpired=true" />;
  }
};