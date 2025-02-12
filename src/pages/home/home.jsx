import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Fetch products from the backend API using Axios
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            import.meta.env.VITE_BACKEND_URL + '/api/products'
          );
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
  
    return (
      <div className="min-h-screen bg-Background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-Text text-center mb-8 animate-fade-in">
            Welcome to Crystal Beauty Clear Store
          </h1>
  
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-PrimaryGold"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  to={`/productInfo/${product.productId}`}
                  key={product.productId}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                    <img
                      src={product.images[0]}
                      alt={product.productName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-Text group-hover:text-PrimaryGold transition-colors duration-300">
                        {product.productName}
                      </h2>
                      <p className="text-PrimaryGold text-lg font-bold">
                        ${product.price}
                      </p>
                      <p className="text-sm text-Text/80">
                        {product.description.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }