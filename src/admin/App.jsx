import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

function AdminApp() {
  const location = useLocation();
  const hideNavbarOnPaths = ["/admin", "/admin/login", "/admin/signup", "/admin/appointments"];
  const shouldShowNavbar = !hideNavbarOnPaths.includes(location.pathname);

  useEffect(() => {
    let link = document.getElementById("admin-style");

    if (location.pathname.startsWith("/admin")) {
      if (!link) {
        link = document.createElement("link");
        link.id = "admin-style";
        link.rel = "stylesheet";
        link.href = "/src/admin/App.css"; // adjust path if needed
        document.head.appendChild(link);
      }
    } else {
      if (link) link.remove();
    }
  }, [location.pathname]);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <div className="container">
        {/* ✅ Render Admin Routes directly */}
        <AppRoutes />
      </div>
    </>
  );
}

export default AdminApp;
