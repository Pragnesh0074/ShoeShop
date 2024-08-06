import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductTile from "./ProductTile";

function ProductList({ searchQuery = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/product");
      setProducts(response.data.products);
      setLoading(false);
    } catch (err) {
      setError("Error fetching products. Please try again later.");
      setLoading(false);
      console.error("Error fetching products:", err);
    }
  };

  // Ensure searchQuery is always a string
  const normalizedSearchQuery = (searchQuery || "").toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(normalizedSearchQuery)
  );

  return (
    <div className="mt-10">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap justify-center items-center">
          {filteredProducts.map((product) => (
            <ProductTile
              key={product._id}
              id={product._id}
              name={product.name}
              desc={product.description}
              price={product.price}
              thumbnail={product.thumbnailUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
