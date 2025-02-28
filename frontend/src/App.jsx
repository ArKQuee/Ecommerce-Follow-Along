import { useState } from "react";
import HomePage from "./components/HomePage";
import ProductsPage from "./pages/ProductsPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FeaturedCard from "./components/FeaturedCard";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "login":
        return <Login onLogin={handleLogin} switchToSignUp={() => navigateTo("signup")} />;
      case "signup":
        return <SignUp onSignUp={handleLogin} switchToLogin={() => navigateTo("login")} />;
      case "home":
        return (
          <div>
            <HomePage navigateTo={navigateTo} isAuthenticated={isAuthenticated} />
            <FeaturedCard
              title="Featured Product"
              description="This is a description of the featured product."
              action={() => console.log('Action button clicked')}
              actionText="Learn More"
            />
          </div>
        );
      case "products":
        return <ProductsPage />;
      default:
        return <HomePage navigateTo={navigateTo} isAuthenticated={isAuthenticated} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigateTo("home")}>
              ShopEase
            </h1>
            <nav className="hidden md:block ml-8">
              <ul className="flex space-x-6">
                <li>
                  <button onClick={() => navigateTo("home")}>Home</button>
                </li>
                <li>
                  <button onClick={() => navigateTo("products")}>Products</button>
                </li>
              </ul>
            </nav>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">
                Logout
              </button>
            ) : (
              <button onClick={() => navigateTo("login")} className="bg-green-600 px-4 py-2 rounded">
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        {renderPageContent()}
      </main>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2025 ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;