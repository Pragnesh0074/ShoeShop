import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductTile from "./ProductTile";

function UserProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
      alert("Error fetching products:", err);
    }
  };

  return (
    <div className="mt-10">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap justify-center items-center">
          {products.map((product) => (
            <ProductTile
              id={product._id}
              name={product.name}
              desc={product.description}
              price={product.price}
              thumbnail={product.thumbnailUrl}
              fetch={fetchProducts}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProductList;