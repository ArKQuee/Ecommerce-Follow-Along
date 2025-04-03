const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const connectDB = require('./config/db');
connectDB();
// Middleware
app.use(cors());
app.use(express.json());



app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

dotenv.config();


const PORT = process.env.PORT || 5000;




// Basic Route
app.get("/", (req, res) => {
  res.send("Ecommerce Backend is Running");
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});