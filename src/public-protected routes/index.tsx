import Login from "@/features/auth/Login/";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import ErrorCtxProvider from "@/contexts/error.js";
import PermErrCtxProvider from "@/contexts/permission_error.js";
import CurrPermCtxProvider from "@/contexts/current_permission.js";

const AppRoute = () => {
  return (
    <ErrorCtxProvider>
      <PermErrCtxProvider>
        <CurrPermCtxProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<ProtectedRoute />} />
            {/* <Route path="/" element={<HomePage />} /> */}
          </Routes >
        </CurrPermCtxProvider>
      </PermErrCtxProvider>
    </ErrorCtxProvider>
  );
};

export default AppRoute;