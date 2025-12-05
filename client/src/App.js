import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";


import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductItemDetails from "./components/ProductItemDetails";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

const App = () => {

  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Protected Routes */}
      <Route exact path="/"  element={<ProtectedRoute>  <Home />  </ProtectedRoute>} />
      <Route exact path="/products" element={  <ProtectedRoute>  <Products />   </ProtectedRoute> } />
      <Route exact path="/products/:id" element={ <ProtectedRoute>  <ProductItemDetails />  </ProtectedRoute>  } />
      <Route exact path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

      {/* Not Found Route */}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default App;
