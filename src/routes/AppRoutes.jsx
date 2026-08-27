import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ProductsPage from "../pages/ProductsPage";
import AddProduct from "../pages/Products/AddProduct";
import Portfolio from "../pages/Portfolio";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<AddProduct />} />

          <Route
            path="/edit-product/:id"
            element={<AddProduct />}
          />

            <Route
            path="/profile"
            element={<Portfolio />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}