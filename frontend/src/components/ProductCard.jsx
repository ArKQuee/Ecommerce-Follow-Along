import React, { useState } from "react";
import PropTypes from "prop-types";
import { Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({ title, price, image, category, onAddToCart, onToggleWishlist }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!isAdded) {
      setIsAdded(true);
      onAddToCart({ title, price, image, category });
      setTimeout(() => setIsAdded(false), 1500); // Reset after 1.5 seconds
    }
  };

  // Handle Wishlist Toggle
  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onToggleWishlist({ title, price, image, category }, !isWishlisted);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
      {/* Product Image & Wishlist */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-4 right-4 p-2 rounded-full transition ${
            isWishlisted ? "bg-red-500 text-white" : "bg-white text-gray-600"
          }`}
        >
          <Heart className="h-5 w-5" fill={isWishlisted ? "red" : "none"} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <span className="text-sm text-indigo-600 font-medium">{category}</span>
        <h3 className="mt-1 text-lg font-semibold text-gray-900">{title}</h3>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">${price}</span>
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              isAdded ? "bg-green-500" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>{isAdded ? "Added" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onToggleWishlist: PropTypes.func.isRequired,
};

export default ProductCard;
