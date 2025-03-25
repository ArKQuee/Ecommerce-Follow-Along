import React from 'react';
import TopBanner from '../components/TopBanner';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      title: "YoKaI Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      category: "Electronics"
    },
    {
      id: 2,
      title: "Minimalist Watch",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      category: "Accessories"
    },
    {
      id: 3,
      title: "Leather Backpack",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
      category: "Bags"
    },
    {
      id: 4,
      title: "Running Shoes",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      category: "Footwear"
    }
  ];

  return (
    <div>
      <TopBanner />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="text-white ml-12">
                <h1 className="text-5xl font-bold mb-4">Summer Collection</h1>
                <p className="text-xl mb-8">Discover our latest arrivals</p>
                <button className="bg-white text-black px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

