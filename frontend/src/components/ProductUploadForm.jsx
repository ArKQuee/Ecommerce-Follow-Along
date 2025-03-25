import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, X, Upload, Tag, DollarSign, Package, Layers, AlertCircle } from 'lucide-react';
import Cookies from 'js-cookie';
import axios from 'axios';

function ProductUploadForm() {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    originalPrice: '',
    price: '',
    category: '',
    stock: '',
    images: []
  });
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateDiscount = () => {
    const original = parseFloat(formData.originalPrice);
    const sale = parseFloat(formData.price);
    if (original && sale && original > sale) {
      const discount = ((original - sale) / original * 100).toFixed(1);
      return `${discount}%`;
    }
    return null;
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files || e.dataTransfer?.files || []);
    
    if (files.length > 0) {
      const previews = files.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...previews]);

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageChange(e);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        formData.images.forEach(image => {
          submitData.append('images', image);
        });
      } else {
        submitData.append(key, formData[key]);
      }
    });

    try {
      await axios.post('http://localhost:2022/api/products/add', submitData, {
        headers: {
          "Authorization": `Bearer ${Cookies.get('authToken')}`
        }
      });
      navigate('/shop'); // Redirect to the shop page after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.response?.data?.message || 'Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!Cookies.get('authToken')) {
    navigate('/login');
    return null;
  }

  const categories = [
    'Electronics', 'Clothing', 'Home & Kitchen', 'Books', 
    'Toys & Games', 'Beauty', 'Sports', 'Other'
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="mt-2 text-gray-600">Fill in the details below to list your product</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Images Section */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-gray-500" />
              Product Images
            </h2>
            
            <div 
              className={`mt-4 border-2 ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-dashed border-gray-300'} rounded-lg p-8`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {previewImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {previewImages.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
              
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <label htmlFor="images" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Upload images
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      Drag and drop or click to select files
                    </span>
                    <input
                      id="images"
                      name="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
                <Tag className="w-4 h-4 mr-2 text-gray-500" />
                Product Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Describe your product in detail"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-gray-500" />
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 flex items-center">
                  <Package className="w-4 h-4 mr-2 text-gray-500" />
                  Available Stock
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  placeholder="Number of items available"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                  Original Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    required
                    placeholder="0.00"
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                  Sale Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="0.00"
                    className="w-full pl-7 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {calculateDiscount() && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        {calculateDiscount()} OFF
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductUploadForm;