import React from "react";
import { Link } from "react-router-dom";

const AuthButton = ({ isMobile = false }) => {
  const token = localStorage.getItem("auth-token");

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

  return token ? (
    <button
      onClick={handleLogout}
      className={`border-2 rounded-lg px-4 py-1 text-[#111] text-sm ${!isMobile ? "hover:border-[#00d4ff] hover:bg-[#00d4ff]" : ""}`}
    >
      logout
    </button>
  ) : (
    <Link to="/LoginSignup">
      <button
        className={`border-2 rounded-lg px-4 py-1 text-[#111] text-sm  border-[#111] hover:border-none hover:bg-[#00d4ff] ${isMobile ? "mt-8" : ""}`}
      >
        Login
      </button>
    </Link>
  );
};

export default AuthButton;
