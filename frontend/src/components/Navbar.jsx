import React, { useState } from "react";
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo & Branding */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">ShopHub</Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-indigo-600">Shop</Link>
            <Link to="/add-product" className="text-gray-700 hover:text-indigo-600">Add Product</Link>
            
          </div>

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden lg:flex relative w-72">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>

          {/* Right: User & Cart */}
          <div className="flex items-center space-x-4">
            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <User className="h-6 w-6 text-gray-700" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                  <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100">Sign Up</Link>
                </div>
              )}
            </div>

            {/* Cart with Badge */}
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => navigate("/cart")}>
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  3
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="flex flex-col p-4 space-y-2">
            <Link to="/" className="py-2 text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/shop" className="py-2 text-gray-700 hover:text-indigo-600">Shop</Link>
            <Link to="/add-product" className="py-2 text-gray-700 hover:text-indigo-600">Add Product</Link>
            <div className="border-t my-2"></div>
            <Link to="/login" className="py-2 text-gray-700 hover:text-indigo-600">Login</Link>
            <Link to="/signup" className="py-2 text-gray-700 hover:text-indigo-600">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
