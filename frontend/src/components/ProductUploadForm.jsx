import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Trash2 } from 'lucide-react';
import * as z from 'zod';

function ProductUploadForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    'Electronics', 'Clothing', 'Home & Kitchen', 
    'Books', 'Toys & Games', 'Beauty', 'Sports', 'Other'
  ];

  // Validation Schema
  const productSchema = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters"),
    price: z.number().min(0.01, "Price must be positive"),
    category: z.string().min(2, "Select a category"),
    images: z.array(z.instanceof(File)).min(1, "At least one image is required").max(5, "Maximum 5 images allowed")
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max
      
      return isValidType && isValidSize;
    });

    if (validFiles.length > 0) {
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...validFiles]
      }));
      
      setPreviewImages(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
    
    setPreviewImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const parsedData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      productSchema.parse(parsedData);

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

      // Simulated API call
      alert("Product Added Successfully!");
      navigate('/shop');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap = error.flatten().fieldErrors;
        setErrors(Object.fromEntries(
          Object.entries(errorMap).map(([key, value]) => [key, value[0]])
        ));
      } else {
        alert("Failed to add product. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <input
              type="number"
              name="price"
              placeholder="Price"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <div 
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/gif"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex justify-center items-center space-x-2">
                <Upload className="text-gray-500" />
                <span className="text-gray-500">
                  {previewImages.length > 0 
                    ? "Add more images" 
                    : "Upload product images"}
                </span>
              </div>
            </div>

            {errors.images && (
              <p className="text-red-500 text-sm mt-1">{errors.images}</p>
            )}

            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {previewImages.map((src, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={src} 
                      alt={`Preview ${index + 1}`} 
                      className="h-20 w-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md text-white transition ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          >
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductUploadForm;