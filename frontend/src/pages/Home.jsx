import React, { useState, useEffect } from 'react';
import TopBanner from '../components/TopBanner';
import ProductCard from '../components/ProductCard';
import { ChevronRight, ChevronLeft, ShoppingBag, Star } from 'lucide-react';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      title: "YoKaI Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      category: "Electronics",
      rating: 4.8,
      reviews: 246
    },
    {
      id: 2,
      title: "Minimalist Watch",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      category: "Accessories",
      rating: 4.6,
      reviews: 189
    },
    {
      id: 3,
      title: "Leather Backpack",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
      category: "Bags",
      rating: 4.7,
      reviews: 153
    },
    {
      id: 4,
      title: "Running Shoes",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      category: "Footwear",
      rating: 4.5,
      reviews: 217
    },
    {
      id: 5,
      title: "Smart Speaker",
      price: 79.99,
      image: "https://i.pcmag.com/imagery/roundups/017S1tRIBIkr8Mfan0lnX4J-59..v1657221180.jpg",
      category: "Electronics",
      rating: 4.4,
      reviews: 178
    },
    {
      id: 6,
      title: "Fitness Tracker",
      price: 69.99,
      image: "https://cdn.thewirecutter.com/wp-content/media/2023/11/fitness-tracker-2048px-5348.jpg?auto=webp&quality=75&crop=1.91:1&width=1200",
      category: "Accessories",
      rating: 4.3,
      reviews: 142
    }
  ];

  const categories = [
    { name: "Electronics", icon: "💻", color: "bg-blue-100 text-blue-800" },
    { name: "Accessories", icon: "⌚", color: "bg-purple-100 text-purple-800" },
    { name: "Bags", icon: "🎒", color: "bg-amber-100 text-amber-800" },
    { name: "Footwear", icon: "👟", color: "bg-green-100 text-green-800" },
    { name: "Apparel", icon: "👕", color: "bg-red-100 text-red-800" }
  ];

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      title: "Summer Collection",
      subtitle: "Discover our latest arrivals with up to 40% off",
      ctaText: "Shop Now",
      align: "left"
    },
    {
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a",
      title: "Tech Essentials",
      subtitle: "Upgrade your gadgets with premium electronics",
      ctaText: "Explore",
      align: "right"
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      title: "Fashion Forward",
      subtitle: "Be bold with our curated style selection",
      ctaText: "View Collection",
      align: "center"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlide = heroSlides[activeIndex];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <TopBanner />
      
      {/* Hero Carousel */}
      <section className="relative h-screen max-h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center ${
              slide.align === 'right' ? 'justify-end text-right' : slide.align === 'center' ? 'justify-center text-center' : 'justify-start text-left'
            }`}>
              <div className={`text-white mx-12 max-w-lg transform transition-all duration-1000 ${
                isVisible && index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl mb-8">{slide.subtitle}</p>
                <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  {slide.ctaText}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </section>
      
      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex overflow-x-auto pb-4 hide-scrollbar space-x-4">
          {categories.map((category) => (
            <div 
              key={category.name}
              className={`flex-shrink-0 ${category.color} px-6 py-4 rounded-xl flex items-center space-x-3 cursor-pointer hover:shadow-md transition-all`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      </section>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trending Now Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
              View All <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                    <Star className="h-5 w-5 text-yellow-400" fill="#FBBF24" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                    <button className="bg-white text-black font-medium px-4 py-2 rounded-full mb-6 flex items-center space-x-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                      <ShoppingBag size={16} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs font-medium text-blue-600 mb-1">{product.category}</div>
                  <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xl">${product.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400" fill="#FBBF24" />
                      <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Feature Banner */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-stone-800 to-amber-900 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 flex flex-col justify-center text-white">
                <h2 className="text-4xl font-bold mb-4">New Collection Release</h2>
                <p className="mb-8 text-lg opacity-90">Be the first to experience our limited edition collection featuring exclusive designs and premium materials.</p>
                <button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium self-start transition-all duration-300 transform hover:scale-105">
                  Pre-order Now
                </button>
              </div>
              <div className="flex items-center justify-center p-12">
                <img
                  src="https://sdmntpreastus2.oaiusercontent.com/files/00000000-8760-51f6-9843-217443dfb145/raw?se=2025-04-01T05%3A56%3A51Z&sp=r&sv=2024-08-04&sr=b&scid=92eb6d19-b8a0-5101-8a30-c83638bede7c&skoid=3f3a9132-9530-48ef-96b7-fee5a811733f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-31T19%3A47%3A55Z&ske=2025-04-01T19%3A47%3A55Z&sks=b&skv=2024-08-04&sig=73BiY0JLi8bcuRHMqYo4RKs9DmJzotbMRE8o/fomAo8%3D"
                  alt="New Collection"
                  className="object-cover h-64 w-full rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
              View All <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">{product.title}</h3>
                  <div className="mt-1 font-bold">${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      {/* Newsletter Subscribe */}
      <section className="bg-gray-100 py-16 mt-12">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-8">Stay updated with our latest offers, products and trends</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;