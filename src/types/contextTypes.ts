import Permission from "@/data/permissions";
import { AxiosError } from "axios";

export type RequiredPermissions = Permission[] | null;
export type CustomError = AxiosError | Error | null;
export type GrantedPermissions = Permission[] | "*" | null;

export type CurrPermCtxType = {
    grantedPermissions: GrantedPermissions;
    setGrantedPermissions: (permissions: GrantedPermissions) => void;
};

export type ErrorCtxType = {
    setError: (error: CustomError) => void;
};

export type PermErrCtxType = {
    failedPermissions: RequiredPermissions;
    setFailedPermissions: (error: RequiredPermissions) => void;
};