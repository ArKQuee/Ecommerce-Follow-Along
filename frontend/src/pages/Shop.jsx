import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Filter, ChevronDown } from "lucide-react";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const products = [
    {
      id: 1,
      title: "YoKaI Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      category: "Electronics",
    },
    {
      id: 2,
      title: "Minimalist Watch",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      category: "Accessories",
    },
    {
      id: 3,
      title: "Leather Backpack",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
      category: "Bags",
    },
    {
      id: 4,
      title: "Running Shoes",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      category: "Footwear",
    },
  ];

  const categories = ["All", "Electronics", "Accessories", "Bags", "Footwear"];

  // Filtered & Sorted Products
  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory
    )
    .filter(
      (product) =>
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice)
    )
    .sort((a, b) => {
      if (sortOrder === "price-low-high") return a.price - b.price;
      if (sortOrder === "price-high-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md h-fit">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">Filters</h2>
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
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedCategory} Products
            </h1>

            {/* Sorting Dropdown */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">
                Sort by <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full mt-2 bg-white shadow-md rounded-md w-40 z-10">
                <button
                  onClick={() => setSortOrder("price-low-high")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition"
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => setSortOrder("price-high-low")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition"
                >
                  Price: High to Low
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg text-center mt-6">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
