import Login from "@/features/auth/Login/";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<ProtectedRoute />} />
      {/* <Route path="/" element={<HomePage />} /> */}
    </Routes>
  );
};

export default AppRoute;