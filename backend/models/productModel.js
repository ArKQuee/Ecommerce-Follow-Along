const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [3, 'Product name must be at least 3 characters long'],
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: function (v) {
        return Number.isFinite(v) && v >= 0;
      },
      message: 'Price must be a valid positive number'
    }
  },
  originalPrice: {
    type: Number,
    validate: {
      validator: function (v) {
        return v == null || v >= this.price;
      },
      message: 'Original price must be greater than or equal to current price'
    }
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['bedroom', 'livingroom', 'kitchen', 'bathroom'],
      message: '{VALUE} is not a valid category'
    }
  },
  images: {
    type: [String],
    required: [true, 'At least one product image is required'],
    validate: {
      validator: function (v) {
        return v.length > 0 && v.every(url => /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url));
      },
      message: 'All images must be valid URLs ending in .jpg, .jpeg, .png, .webp, or .gif'
    }
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    validate: {
      validator: Number.isInteger,
      message: 'Stock must be an integer'
    },
    default: 1
  },
  userEmail: {
    type: String,
    required: [true, 'User email is required'],
    match: [/.+@.+\..+/, 'Please enter a valid email']
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot exceed 5'],
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// **🔹 Virtual for Discount Percentage**
productSchema.virtual('calculatedDiscount').get(function () {
  if (this.originalPrice && this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// **🔹 Method to Check Availability**
productSchema.methods.checkAvailability = function (quantity = 1) {
  return this.stock >= quantity;
};

// **🔹 Pre-save Middleware to Update Availability & Discount**
productSchema.pre('save', function (next) {
  this.isAvailable = this.stock > 0;
  this.discountPercentage = this.calculatedDiscount; // Update discount percentage dynamically
  next();
});

module.exports = mongoose.model('Product', productSchema);
