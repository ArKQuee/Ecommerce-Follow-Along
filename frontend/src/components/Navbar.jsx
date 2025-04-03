import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToCart = () => navigate("/cart");

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md border-b border-gray-600/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-extrabold text-white tracking-tight hover:text-gray-300 transition-colors duration-300"
            >
              ShopHub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["Home", "Shop", "Add Product"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                className="text-gray-200 hover:text-white hover:scale-105 transform transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex relative w-72">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 text-white rounded-full focus:ring-2 focus:ring-gray-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5 hover:text-white transition-colors duration-300" />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* User Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-700/50 text-white transition-all duration-300 flex items-center group"
              >
                <User className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                <ChevronDown className={`h-4 w-4 ml-1 transition-all duration-300 ${userMenuOpen ? 'rotate-180 text-gray-400' : ''}`} />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md shadow-xl rounded-lg border border-gray-800/50 animate-fadeIn">
                  {["Profile", "Orders", "Login", "Sign Up"].map((item) => (
                    <Link
                      key={item}
                      to={`/${item.toLowerCase().replace(" ", "")}`}
                      className="block px-4 py-2.5 text-gray-200 hover:bg-gray-800/50 hover:text-white transition-all duration-200"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-700/50 transition-all duration-300 relative group"
                onClick={goToCart}
              >
                <ShoppingCart className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  3
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-700/50 text-white transition-all duration-300"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden backdrop-blur-md border-t border-gray-800/50 animate-slideDown">
          <div className="flex flex-col p-4 space-y-3">
            {["Home", "Shop", "Add Product", "Login", "Sign Up"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                className="py-2 text-gray-200 hover:text-white hover:pl-4 transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// Custom animations (unchanged)
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
  .animate-slideDown {
    animation: slideDown 0.3s ease-out;
  }
`;

export default Navbar;