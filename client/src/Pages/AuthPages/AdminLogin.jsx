import Button from "../../Components/Button";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminContext } from "../../App";

function AdminLogin() {
  
  const navigate = useNavigate();
  const { fetchAdmin } = useContext(AdminContext);
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/adminLogin",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { user, message, success } = data;
      if (success) {
        alert(message);
        fetchAdmin(true, user);
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
      ...inputValue,
      username: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-20 mt-10 sm:mt-20">
      <h1 className="text-2xl sm:text-3xl text-black font-bold text-center mb-6 sm:mb-10">
        Login To ShoeShop
      </h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-xl sm:text-2xl font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleOnChange}
            className="w-full min-h-[50px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-xl sm:text-2xl font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleOnChange}
            className="w-full min-h-[50px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-center">
          <Button text="Login" clickFun={handleSubmit} />
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
