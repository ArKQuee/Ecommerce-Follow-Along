import React from 'react';

import { Minus, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to your cart to see them here.</p>
          <Link
            to="/shop"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems} items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-6 p-6 bg-white rounded-lg shadow-md mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              
              <div className="flex-grow">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:w-80">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;