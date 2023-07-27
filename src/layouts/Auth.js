import React from "react";
import Login from "../views/Login";

const AuthLayout = ({ onLogin }) => {
  return (
    <div>
      <Login onLogin={onLogin} />
    </div>
  );
};

export default AuthLayout;
