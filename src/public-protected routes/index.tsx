import Login from "@/features/auth/Login/";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import ErrorCtxProvider from "@/contexts/error.js";
import PermErrCtxProvider from "@/contexts/permission_error.js";
import CurrUserCtxProvider from "@/contexts/current_user.js";

const AppRoute = () => {
  return (
    <ErrorCtxProvider>
      <PermErrCtxProvider>
        <CurrUserCtxProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<ProtectedRoute />} />
          </Routes >
        </CurrUserCtxProvider>
      </PermErrCtxProvider>
    </ErrorCtxProvider>
  );
};

export default AppRoute;