import React, { useState } from "react";
import SeachBar from "./SeachBar";
import ProductList from "./ProductList";

function ProductPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div
      id="heroComp"
      className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10"
    >
      <div className="flex flex-col text-center font-bold align-middle justify-center items-center mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
          Explore All Products
        </h1>
        <SeachBar onSearchChange={handleSearchChange} />
      </div>
      <ProductList searchQuery={searchQuery} />
    </div>
  );
}

export default ProductPage;
