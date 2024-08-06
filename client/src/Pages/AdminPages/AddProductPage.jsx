import React from "react";
import axios from "axios";
import { useState } from "react";
import Button from "../../Components/Button";
import { Link, useNavigate } from "react-router-dom";

function AddProductPage(props) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
  });
  const [thumbnail, setThumbnail] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", inputValue.name);
      formData.append("description", inputValue.description);
      formData.append("price", inputValue.price);
      formData.append("stockQuantity", inputValue.stockQuantity);
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const { data } = await axios.post(
        "http://localhost:4000/product",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { success, message } = data;
      if (success) {
        alert(message);
        setTimeout(() => {
          navigate("/adminHomePage");
        }, 1000);
      } else {
        alert(message);
      }
    } catch (error) {
      alert(error);
    }
    setInputValue({
      name: "",
      description: "",
      price: "",
      stockQuantity: "",
    });
    setThumbnail(null);
  };

  return (
    <div className="flex flex-col items-center text-center p-4 sm:p-6 lg:p-8">
      <p className="text-3xl font-bold">Add New Product</p>
      <div className="mt-10" />
      <form className="w-full max-w-3xl">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 text-2xl font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleOnChange}
            className="min-h-[50px] flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 text-2xl font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleOnChange}
            className="min-h-[50px] flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-gray-700 text-2xl font-bold mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={handleOnChange}
            className="min-h-[50px] flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="stockQuantity"
            className="block text-gray-700 text-2xl font-bold mb-2"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            onChange={handleOnChange}
            className="min-h-[50px] flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="thumbnail"
            className="block text-gray-700 text-2xl font-bold mb-2"
          >
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleFileChange}
            className="min-h-[50px] flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button text="Add Product" clickFun={handleSubmit} />
        </div>
      </form>
    </div>
  );
}

export default AddProductPage;
