import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminBtn from "./AdminBtn";
import { Menu } from "lucide-react";

export default function AdminHeader({ admin, adminData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-3 border-b [border-bottom-style:solid] border-[#e5e8ea]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="[font-family:'Manrope-Bold',Helvetica] font-bold text-[#111611] text-lg">
            ShoeShop
          </div>
        </div>

        {/* Mobile menu button */}
        {admin && (
          <div className="sm:hidden">
            <button onClick={toggleMenu} className="text-[#111611]">
              <Menu size={24} />
            </button>
          </div>
        )}

        {/* Desktop menu */}
        {admin && (
          <div className="hidden sm:flex items-center justify-end gap-8 flex-1">
            <nav className="flex items-center gap-6">
              <Link
                to="/adminHomePage"
                className="[font-family:'Manrope-Medium',Helvetica] font-medium text-[#111611] text-sm"
              >
                Home
              </Link>
              <Link
                to="/AddProductPage"
                className="[font-family:'Manrope-Medium',Helvetica] font-medium text-[#111611] text-sm"
              >
                Add Product
              </Link>
              <Link
                to="/orderListPage"
                className="[font-family:'Manrope-Medium',Helvetica] font-medium text-[#111611] text-sm"
              >
                Orders
              </Link>
              <AdminBtn />
            </nav>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {admin && isMenuOpen && (
        <div className="sm:hidden mt-4 bg-white p-4 shadow-lg rounded-lg">
          <nav className="flex flex-col gap-4">
            <Link
              to="/adminHomePage"
              onClick={toggleMenu}
              className="[font-family:'Manrope-Medium',Helvetica] font-medium text-[#111611] text-sm"
            >
              Home
            </Link>
            <Link
              to="/AddProductPage"
              onClick={toggleMenu}
              className="[font-family:'Manrope-Medium',Helvetica] font-medium text-[#111611] text-sm"
            >
              Add Product
            </Link>
            <Link
              to="/orderListPage"
              onClick={toggleMenu}
              className="[font-family:'Manrope-Medium',Helvetica] font-medium text-[#111611] text-sm"
            >
              Orders
            </Link>
            <div className="mt-4 flex justify-center">
              <AdminBtn />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
