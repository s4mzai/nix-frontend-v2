import Permission from "@/data/permissions";
import { GrantedPermissions, IUser } from "@/types/contextTypes";

export const getUserFromStorage = () => {
  const data = localStorage.getItem("user");
  if (!data) { return null; }

  const user = JSON.parse(data);
  return getUserFromJSON(user);
};

export const getTokenFromStorage = () => {
  return localStorage.getItem("token");
};

export const getUserFromJSON = (user) => {
  if (!user) { return null; }

  const user_data = {
    name: user.name,
    email: user.email,
    id: user.id,
    avatar: user.avatar,
    bio: user.bio,
    role: user.role,
    permission: user.permission,
    is_superuser: user.is_superuser
  } as IUser;

  const permissions = (user.is_superuser ? "*" : user.permission as Permission[]) as GrantedPermissions;

  return { user: user_data, permissions: permissions };
};