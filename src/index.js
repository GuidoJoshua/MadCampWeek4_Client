import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

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
