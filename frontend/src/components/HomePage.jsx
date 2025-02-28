import FeaturedCard from "./FeaturedCard";
import PropTypes from 'prop-types';

const HomePage = ({ navigateTo, isAuthenticated }) => (
  <div className="max-w-4xl mx-auto mt-10">
    <h1 className="text-3xl font-bold mb-6">Welcome to Our Store!</h1>
    <p className="text-lg mb-6">
      Explore our wide range of products and enjoy a seamless shopping experience.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <FeaturedCard 
        title="New Arrivals" 
        description="Check out our latest products" 
        action={() => navigateTo("products")}
        actionText="Shop Now"
      />
      <FeaturedCard 
        title="Special Offers" 
        description="Limited time discounts on select items" 
        action={() => navigateTo("products")}
        actionText="View Offers"
      />
      <FeaturedCard 
        title="Membership" 
        description="Join our loyalty program for exclusive benefits" 
        action={() => navigateTo(isAuthenticated ? "account" : "signup")}
        actionText={isAuthenticated ? "View Benefits" : "Sign Up"}
      />
    </div>
  </div>
);
HomePage.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default HomePage;

