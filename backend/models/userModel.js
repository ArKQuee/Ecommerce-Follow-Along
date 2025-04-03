const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Name must be at least 3 characters long"],
            maxlength: [100, "Name cannot exceed 100 characters"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: true,
        },
        googleId: {
            type: String,
            default: null,
        },
        cart: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, "Quantity cannot be less than 1"],
                    default: 1,
                },
            },
        ],
        addresses: [
            {
                street: String,
                city: String,
                state: String,
                zipCode: String,
                country: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
