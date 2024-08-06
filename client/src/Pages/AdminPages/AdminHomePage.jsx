import React from "react";
import ProductList from "./ProductList";

function AdminHomePage() {
  return (
    <>
      <div className="flex justify-center items-center text-center text-3xl font-bold py-6">
        <p>Product List</p>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <ProductList />
      </div>
    </>
  );
}

export default AdminHomePage;
