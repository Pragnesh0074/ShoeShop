import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { AdminContext } from "../App";
import React from 'react';
import { useContext } from 'react';


export default function AdminBtn() {

  const navigate = useNavigate();
  const { fetchAdmin } = useContext(AdminContext);
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/logout",
        { withCredentials: true }
      );
      const { status, message } = data;
      if (status) {
        alert(message);
        await fetchAdmin(false, null);
        setTimeout(() => {
          navigate("/adminLogin");
        }, 1000);
      } else {
        alert(message);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center items-center">
          <UserCircleIcon aria-hidden="true" className="h-10 w-10" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div className="py-1">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={handleSubmit}
                className={`block w-full px-4 py-2 text-left text-sm text-gray-700 ${
                  active ? "bg-gray-100 text-gray-900" : ""
                }`}
              >
                Sign out
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
