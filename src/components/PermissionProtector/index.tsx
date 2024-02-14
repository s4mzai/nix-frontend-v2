import React, { useContext, useState, useEffect } from 'react'
import { appContext } from '../../public-protected routes/ProtectedRoute';
import Permissions from "../../data/permissions";
import { Navigate } from "react-router-dom";

export const PermissionProtector = ({ children, permission: required_permissions, silent }: any) => {
    const context = useContext(appContext);
    const { permissions, setPermErr } = context;

    if (!required_permissions || required_permissions?.length === 0 || permissions === "*") return children;

    if (permissions) {
        const failedPerm = (required_permissions as Permissions[]).filter((permission: Permissions) => !permissions.includes(permission));
        if (failedPerm.length > 0) {
            if (!silent) setPermErr(failedPerm);
            return <></>
        } else {
            return children
        }
    } else {
        return <Navigate to="/login?sessionExpired=true" />
    }
};