import React from 'react'
import Button from '../../Components/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import {useState} from "react";

axios.defaults.withCredentials = true;


function SignupPage({fetchUser}) {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
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
        "http://localhost:4000/signup",
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
      username: "",
    });
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-20 mt-10 sm:mt-20">
      <h1 className="text-2xl sm:text-3xl text-black font-bold text-center mb-6 sm:mb-10">
        Welcome To ShoeShop
      </h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-xl sm:text-2xl font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleOnChange}
            className="w-full min-h-[50px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-xl sm:text-2xl font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
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
        <div className="flex flex-col items-center">
          <Button text="Signup" clickFun={handleSubmit} />
          <div className="mt-5 text-center">
            <span>
              Already have account?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-700">
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignupPage