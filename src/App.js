import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth";
import Login from "views/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Check if the user is already logged in (you can replace this with your authentication check logic)
  useState(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("accessToken")));
  }, []);

  const handleLogin = () => {
    // Perform login logic here (e.g., authentication with API)
    // If login is successful, update the login state
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here
    // If logout is successful, update the login state
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* If the user is not logged in, show the AuthLayout (login page) */}
        {!isLoggedIn && (
          <Route
            path="/login"
            element={<AuthLayout onLogin={handleLogin} />}
          />
        )}
        {/* If the user is logged in, show the AdminLayout (dashboard) */}
        {isLoggedIn && (
          <Route
            path="/admin/*"
            element={<AdminLayout onLogout={handleLogout} />}
          />
        )}
        {/* If the user is not logged in and tries to access any admin routes, redirect to login */}
        {!isLoggedIn && <Route path="/admin/*" element={<Navigate to="/login" replace />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.css";
// import "assets/scss/now-ui-dashboard.scss?v1.5.0";
// import "assets/css/demo.css";

// import AdminLayout from "layouts/Admin.js";
// import AuthLayout from "layouts/Auth";

// ReactDOM.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/login" element={<AuthLayout />} />
//       <Route path="/admin/*" element={<AdminLayout />} />
//     </Routes>
//   </BrowserRouter>,
//   document.getElementById("root")
// );
