import React, { useState, useEffect } from "react";
import { Filter, ChevronDown, X } from "lucide-react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const products = [
    {
      id: 1,
      title: "YoKaI Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      category: "Electronics",
      description: "High-quality noise-cancelling headphones with premium sound."
    },
    {
      id: 2,
      title: "Minimalist Watch",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      category: "Accessories",
      description: "Sleek and modern watch with minimalist design."
    },
    {
      id: 3,
      title: "Leather Backpack",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
      category: "Bags",
      description: "Durable leather backpack with multiple compartments."
    },
    {
      id: 4,
      title: "Running Shoes",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      category: "Footwear",
      description: "Comfortable running shoes with advanced cushioning."
    },
  ];

  const categories = ["All", "Electronics", "Accessories", "Bags", "Footwear"];

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sortDropdown = document.getElementById('sort-dropdown');
      if (sortDropdown && !sortDropdown.contains(event.target)) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory
    )
    .filter(
      (product) =>
        (!minPrice || product.price >= parseFloat(minPrice)) &&
        (!maxPrice || product.price <= parseFloat(maxPrice))
    )
    .sort((a, b) => {
      if (sortOrder === "price-low-high") return a.price - b.price;
      if (sortOrder === "price-high-low") return b.price - a.price;
      return 0;
    });

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("default");
  };

  // Sidebar Filter Component
  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'block md:hidden' : 'hidden md:block'} w-full md:w-64 bg-white p-6 rounded-lg shadow-md h-fit`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        {isMobile && (
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`block w-full text-left px-3 py-2 rounded transition ${
                selectedCategory === category
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={resetFilters}
        className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-6">
        <button 
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Filter className="h-5 w-5" />
          Show Filters
        </button>
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-80 bg-white h-full overflow-y-auto animate-slide-in">
            <FilterSidebar isMobile={true} />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar Filter */}
        <FilterSidebar />

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedCategory} Products
            </h1>

            {/* Sorting Dropdown */}
            <div className="relative" id="sort-dropdown">
              <button 
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                {sortOrder === "default" 
                  ? "Sort by" 
                  : (sortOrder === "price-low-high" 
                    ? "Price: Low to High" 
                    : "Price: High to Low")}
                <ChevronDown className={`h-4 w-4 transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSortDropdownOpen && (
                <div className="absolute top-full mt-2 bg-white shadow-md rounded-md w-40 z-10 border">
                  <button
                    onClick={() => {
                      setSortOrder("price-low-high");
                      setIsSortDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition"
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => {
                      setSortOrder("price-high-low");
                      setIsSortDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition"
                  >
                    Price: High to Low
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-xl"
                >
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Products Found</h2>
              <p className="text-gray-500 mb-6">Try adjusting your filters or reset them.</p>
              <button 
                onClick={resetFilters}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;