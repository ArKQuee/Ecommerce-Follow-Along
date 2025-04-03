const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Signup
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

       

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ msg: 'User created successfully' });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, "hello", { expiresIn: "1h" });

        // Send token as a cookie and in response
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Get User Profile
const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password from response
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.status(200).json({ user });
    } catch (err) {
        console.error("Profile Fetch Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Add Address
const addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        user.addresses.push(req.body);
        await user.save();
        res.status(200).json({ message: "Address added successfully" });

    } catch (err) {
        console.error("Add Address Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete Address
const deleteAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        user.addresses = user.addresses.filter(addr => addr._id.toString() !== req.params.id);
        await user.save();
        res.status(200).json({ message: "Address deleted successfully" });

    } catch (err) {
        console.error("Delete Address Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get User Addresses
const getAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.status(200).json({ addresses: user.addresses });

    } catch (err) {
        console.error("Get Addresses Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { signup, login, profile, addAddress, deleteAddress, getAddresses };
