import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

const HeaderConditionalRenderer = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return <>{!isAdminRoute && <Header />}</>;
};

export default HeaderConditionalRenderer;
