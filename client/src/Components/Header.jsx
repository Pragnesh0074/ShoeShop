import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserBtn from "../Pages/UserPages/UserHomePage/UserBtn";
import { Menu } from "lucide-react";

export default function Header({ user, userData, fetchUser }) {

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
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-[#111611]">
            <Menu size={24} />
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center justify-end gap-8 flex-1">
          <nav className="flex items-center gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            {user && <NavLink to="/cart">Cart</NavLink>}
          </nav>
          
          {user ? (
            <UserBtn handleSubmit={fetchUser()} />
          ) : (
            <div className="flex items-center gap-2">
              <AuthButton to="/signup" primary>Sign up</AuthButton>
              <AuthButton to="/login">Log in</AuthButton>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden mt-4">
          <nav className="flex flex-col gap-4">
            <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/products" onClick={toggleMenu}>Products</NavLink>
            {user && <NavLink to="/cart" onClick={toggleMenu}>Cart</NavLink>}
          </nav>
          {user ? (
            <div className="mt-4 flex justify-center">
              <UserBtn handleSubmit={fetchUser()} />
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              <AuthButton to="/signup" primary onClick={toggleMenu}>Sign up</AuthButton>
              <AuthButton to="/login" onClick={toggleMenu}>Log in</AuthButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="[font-family:'Manrope-Medium',Helvetica] font-medium text-[#111611] text-sm"
  >
    {children}
  </Link>
);

const AuthButton = ({ to, primary, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`inline-flex items-center justify-center px-4 py-2 rounded-xl [font-family:'Manrope-Bold',Helvetica] font-bold text-sm ${
      primary
        ? "bg-[#59f28c] text-[#111611]"
        : "bg-[#eff4f2] text-[#111611]"
    }`}
  >
    {children}
  </Link>
);
