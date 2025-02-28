const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

function validatePassword(password) {
    return (
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*(){}<>?]/.test(password)
    );
}

function validateAge(dob) {
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    return age >= 18;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; 
        },
        validate: {
            validator: function(password) {
                if (this.googleId) return true;
                return validatePassword(password);
            },
            message: "Password must contain one uppercase letter, one lowercase letter, one number, and one special character"
        },
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: validateAge,
            message: 'You must be at least 18 years old'
        }
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
}, {
    timestamps: true,
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;