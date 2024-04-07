import { CurrUserCtx } from "@/contexts/current_user";
import { PermErrCtx } from "@/contexts/permission_error";
import Permission from "@/types/permissions";
import React, { ReactNode } from "react";

type FallbackChild =
  | React.ReactElement
  | Iterable<React.ReactNode>
  | React.ReactPortal
  | boolean;

interface PermissionProtectorProps {
  children?: ReactNode;
  permission?: Permission[];
  fallback?: FallbackChild;
}

/**
 * Renders the children components only if the user has the required permissions.
 * If the user does not have the required permissions, it can either render a fallback component or simply just hide the child.
 *
 * Depending on the `fallback` prop, the component can behave in the following ways:
 * 1. `false` - Displays a full screen blocking error message.
 * 1. `true` - Hides the children components.
 * 1. `React.ReactNode` - Renders the provided component.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The components to be rendered if the user has the required permissions.
 * @param {Permission[]} [props.permission=[]] - The required permissions for the user to access the children components.
 * @param {boolean|React.ReactNode} [props.fallback=false] - The fallback component or content to be rendered if the user does not have the required permissions.
 * @returns {React.ReactNode} - The rendered components or fallback content.
 */
export const PermissionProtector: React.FC<PermissionProtectorProps> = ({
  children,
  permission: required_permissions = [],
  fallback = false,
}): React.ReactNode => {
  const { grantedPermissions, ready } = React.useContext(CurrUserCtx);
  const { setFailedPermissions } = React.useContext(PermErrCtx);

  if (
    !required_permissions ||
    required_permissions?.length === 0 ||
    grantedPermissions === "*"
  ) {
    return children;
  }
  if (!ready) return <></>;

  if (grantedPermissions && grantedPermissions.length > 0) {
    const failedPerm = required_permissions.filter(
      (permission) => !grantedPermissions.includes(permission),
    );
    if (failedPerm.length > 0) {
      if (fallback === false) {
        setFailedPermissions(failedPerm);
        return <></>;
      } else if (fallback === true) {
        return <></>;
      } else {
        return fallback;
      }
    } else {
      return children;
    }
  } else {
    if (fallback === false) {
      setFailedPermissions(required_permissions);
      return <></>;
    } else if (fallback === true) {
      return <></>;
    } else {
      return fallback;
    }
  }
};
