import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, role, component }) => {
  return Object.keys(isAuth).length && isAuth.maLoaiNguoiDung === role ? component : <Navigate to="/" />;
};

export default ProtectedRoute;
