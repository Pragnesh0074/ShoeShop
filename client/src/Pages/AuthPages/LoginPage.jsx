import Button from '../../Components/Button'
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

function LoginPage({fetchUser}) {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
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
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        alert(message);
        await fetchUser();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        alert(message);
      }
    } catch (error) {
      alert(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  const handleClick = () => {
      navigate("/adminLogin");
  }

  return (
    <div className='flex flex-col items-center px-4 sm:px-6 lg:px-20 mt-10 sm:mt-20'>
    <h1 className='text-2xl sm:text-3xl text-black font-bold text-center'>Login To ShoeShop</h1>
    <form className="mt-8 w-full max-w-md">
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 text-lg sm:text-2xl font-bold mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleOnChange}
          className="w-full min-h-[50px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-lg sm:text-2xl font-bold mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleOnChange}
          className="w-full min-h-[50px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className='flex flex-col items-center gap-4'>
        <Button text="Login" clickFun={handleSubmit} />
        <span className="text-sm sm:text-base">
          New User? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
        </span>
        <Button text="Admin Login" clickFun={handleClick} />
      </div>
    </form>
  </div>
  )
}

export default LoginPage