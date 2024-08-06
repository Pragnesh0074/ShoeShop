import Button from "../../../Components/Button";
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";

function OrderPage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    address: "",
  });

  const userData = useContext(UserContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const userId = userData._id;
    try {
      const { data } = await axios.post(
        "http://localhost:4000/order",
        {
          userId,
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      navigate("/");
      alert(message);
    } catch (error) {
      alert(error);
    }
    setInputValue({
      ...inputValue,
      address: "",
    });
  };

  return (
    <div className="flex flex-col text-center font-bold align-middle justify-center items-center mx-4 sm:mx-16 lg:mx-32">
      <p className="text-2xl sm:text-3xl lg:text-4xl">Place Your Order</p>
      <div className="flex flex-col align-middle justify-center items-center mt-6 sm:mt-8 lg:mt-10">
        <label
          htmlFor="address"
          className="block text-gray-700 text-lg sm:text-xl lg:text-2xl font-bold my-2"
        >
          Enter Your Address
        </label>
        <textarea
          id="address"
          name="address"
          rows="4"
          onChange={handleOnChange}
          className="mt-4 sm:mt-6 lg:mt-10 min-h-[50px] w-full flex shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <div className="mt-6 sm:mt-8 lg:mt-10" />
        <Button text="Submit Order" clickFun={handleSubmit} />
      </div>
    </div>
  );
}

export default OrderPage;
