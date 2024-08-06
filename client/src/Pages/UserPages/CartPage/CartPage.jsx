import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import Button from "../../../Components/Button";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();
  const userData = useContext(UserContext);

  useEffect(() => {
    if (userData && userData._id) {
      fetchCart();
    }
  }, []);

  useEffect(() => {
    calculateTotalCost();
  }, [cart]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/cart/${userData._id}`
      );
      if (response.data && response.data.items) {
        setCart(response.data.items);
      } else {
        setCart([]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 404) {
        setCart([]);
      } else {
        alert("Error fetching cart: " + err.message);
      }
    }
  };

  const handleDelete = async (pId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/cart/${userData._id}/remove/${pId}`
      );
      const { message } = response;
      alert("Item removed from cart");
      fetchCart();
    } catch (err) {
      alert("Error removing item from cart: " + err.message);
    }
  };

  const calculateTotalCost = () => {
    const total = cart.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
    setTotalCost(total);
  };

  const handleSubmit = () => {
    navigate("/order");
  };

  return (
    <div className="flex flex-col text-center font-bold align-middle justify-center items-center mx-4 sm:mx-16 lg:mx-32">
      <p className="text-2xl sm:text-3xl lg:text-4xl">Your Cart</p>
      {loading ? (
        <h1 className="mt-6 sm:mt-8 lg:mt-10 flex flex-col text-center font-bold align-middle justify-center items-center mx-4 sm:mx-16 lg:mx-32">
          Loading...
        </h1>
      ) : cart.length === 0 ? (
        <p className="mt-6 sm:mt-8 lg:mt-10 text-lg sm:text-xl">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 sm:mt-8 lg:mt-10 w-full">
            <table className="w-full text-xs sm:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs sm:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-3 sm:px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3">
                    Subtotal
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item.product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.product.name}
                    </th>
                    <td className="px-3 sm:px-6 py-4">
                      ${item.product.price.toFixed(2)}
                    </td>
                    <td className="px-3 sm:px-6 py-4">{item.quantity}</td>
                    <td className="px-3 sm:px-6 py-4">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-right">
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(item.product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-10 text-lg sm:text-xl">
            Total Cost: ${totalCost.toFixed(2)}
          </div>
          <Button text="Place Order" clickFun={handleSubmit} />
        </>
      )}
    </div>
  );
}

export default CartPage;
