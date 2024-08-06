import React, { useState, useEffect } from "react";
import axios from "axios";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/order?page=${page}&limit=10`
      );
      setOrders(response.data.docs);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Error fetching orders: " + err.message);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col text-center font-bold items-center mx-4 sm:mx-8 lg:mx-16">
      <h1 className="text-3xl sm:text-4xl mb-6">Order List</h1>
      {loading ? (
        <h2 className="mt-10 text-xl">Loading...</h2>
      ) : orders.length === 0 ? (
        <p className="mt-10 text-lg">No orders found.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          {orders.map((order) => (
            <Disclosure key={order._id} as="div" className="mt-4">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>
                      Order #{order._id} - User: {order.user.username} - Total:
                      ${order.totalAmount.toFixed(2)}
                    </span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-4 py-2">
                              Product name
                            </th>
                            <th scope="col" className="px-4 py-2">
                              Price
                            </th>
                            <th scope="col" className="px-4 py-2">
                              Quantity
                            </th>
                            <th scope="col" className="px-4 py-2">
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr
                              key={item._id}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                              <td className="px-4 py-2">{item.name}</td>
                              <td className="px-4 py-2">
                                ${item.price.toFixed(2)}
                              </td>
                              <td className="px-4 py-2">{item.quantity}</td>
                              <td className="px-4 py-2">
                                ${(item.price * item.quantity).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-4">
                      Shipping Address: {order.shippingAddress}
                    </p>
                    <p>
                      Order Date: {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
          <div className="flex justify-center mt-4 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderListPage;
