const ProductsPage = () => (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <p className="mb-8">Browse our collection of high-quality products.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div key={item} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 h-48"></div>
            <div className="p-4">
              <h3 className="font-bold">Product {item}</h3>
              <p className="text-gray-600 text-sm mb-2">Product description goes here</p>
              <p className="font-bold text-blue-600">$99.99</p>
              <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  export default ProductsPage;
  