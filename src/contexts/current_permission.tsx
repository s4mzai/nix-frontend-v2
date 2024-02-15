import React from "react";
import { CurrPermCtxType, GrantedPermissions } from "@/types/contextTypes";

export const CurrPermsCtx = React.createContext<CurrPermCtxType | null>(null);

const CurrPermCtxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [grantedPermissions, setGrantedPermissions] = React.useState<GrantedPermissions>(null);

  const setPermissions = (perms: GrantedPermissions) => {
    setGrantedPermissions(perms);
  };

  return (
    <CurrPermsCtx.Provider value={{
      grantedPermissions,
      setGrantedPermissions: setPermissions
    }}>
      {children}
    </CurrPermsCtx.Provider>
  );
};

export default CurrPermCtxProvider;