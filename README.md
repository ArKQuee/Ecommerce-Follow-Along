hi# Ecommerce-Follow-Along
# Project Title: E-Commerce Application

## Project Overview
This project involves creating a full-stack E-Commerce Application that provides a seamless shopping experience for users. The platform allows users to browse products, add items to a cart, and make secure purchases. Admin users can manage inventory, track orders, and analyze sales data. The application emphasizes user-friendly design, secure transactions, and scalability, while demonstrating proficiency in modern web development practices.

## Key Features
### For Users
- User Authentication: Secure user registration, login, and account management using JWT.
- Product Browsing: View a wide range of products with categories, filters, and search functionality.
- Cart Management: Add, remove, and update items in a shopping cart.
- Order Management: Place orders, view order history, and track deliveries.
- Payment Integration: Secure payment gateway integration for a smooth checkout experience.
- Reviews and Ratings: Allow users to leave feedback on purchased products.

### For Admins
- Inventory Management: Add, update, and delete products, categories, and stock levels.
- Order Tracking: Monitor and manage customer orders and shipping statuses.
- Sales Analytics: Visualize sales trends, customer behavior, and inventory turnover.

### General Features
- Responsive Design: Ensure the application is fully responsive across devices.
- Wishlist: Enable users to save products for later.
- Notification System: Notify users about order updates, discounts, and promotions.
- User Dashboard: Provide a personalized dashboard to manage profiles, orders, and preferences.

## Tech Stack
### Frontend
- React (with Vite for fast builds and development)
- Redux Toolkit for state management
- CSS/SCSS or Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express for the server-side logic
- MongoDB with Mongoose for database management
- JWT for user authentication
- bcrypt for password hashing
- Stripe or Razorpay for payment gateway integration

### Additional Tools
- Docker for containerization
- Jest and Cypress for testing
- AWS or Firebase for deployment
- GitHub Actions for CI/CD

## Why This Project?
The E-Commerce application is a perfect project to learn and implement full-stack development skills while addressing real-world challenges. It involves:
- Building a scalable and maintainable backend.
- Creating a dynamic and engaging frontend.
- Managing complex workflows, such as authentication, payments, and order tracking.
- Exploring tools and technologies for deployment, testing, and continuous integration.


## Updates
- **Milestone 1**: Made a README.md for the Ecommerce Application and laid the foundation for your E-Commerce Application.
- **Milestone 2**: Set up the frontend with React using Create React App. Configured Tailwind CSS for styling. Set up a basic Node.js backend server with Express Developed a functional and styled login page for the frontend.
- **Milestone 3**: Created backend folders: config/, controllers/, routes/, models/, middleware/. Set up a MongoDB connection in config/db.js. Implemented a basic User API (/api/users/test). Added error handling middleware. Configured nodemon for development.
- **Milestone 4**: Creation of the User model. User controller with register, login, and profile picture update functionality. Multer configuration for file uploads.
- **Milestone 5**: Created a responsive Sign-Up Page using React and Tailwind CSS. Added form validation for email format and password length. Updated routes to include /signup.
- **Milestone 6**: Defined a Mongoose schema for users. Stored user details including name, email, and password. Ensured the password is hashed before saving. Used bcrypt to hash passwords before storing them in the database. Prevented storing plain-text passwords for better security. Created a /api/users/signup route to handle user registration. Validated user input before storing data. Checked for duplicate emails before creating a new user.
- **Milestone 7**: Implemented user login functionality. Validated user credentials securely. Used bcrypt to compare hashed passwords. Generated JWT tokens for authentication.
- **Milestone 8**: Created a reusable card component for product details such as name, image, price. Used array mapping (`.map()`) to iterate over a product list and generate multiple cards dynamically.
- **Milestone 9: Product Input & Image Upload**  
  Developed a product input form with validation and multiple image upload functionality.

- **Milestone 10: Product Schema & POST Endpoint**  
  Created a Mongoose schema with validation and a POST endpoint to store product data in MongoDB.

- **Milestone 11: Fetch & Display Products**  
  Built an endpoint to retrieve all products and dynamically display them on the frontend.

- **Milestone 12: User-Specific Products**  
  Implemented a "My Products" page, filtering and displaying products based on the logged-in user's email.

- **Milestone 13: Product Editing**  
  Added an "Edit" button, pre-filled form, and backend endpoint to update product details in MongoDB.

- **Milestone 14: Product Deletion**  
  Created a "Delete" button and backend endpoint to remove products from MongoDB using their unique ID.

- **Milestone 15: Navbar Component**  
  Built a reusable Navbar with links for Home, My Products, Add Product, and Cart, integrating it across pages.

