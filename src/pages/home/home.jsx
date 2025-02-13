import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products`
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

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    return (
        <div className="min-h-screen bg-Background flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold text-Text text-center mb-8 animate-fade-in">
                Welcome to Crystal Beauty Clear Store
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-PrimaryGold"></div>
                </div>
            ) : (
                <div className="relative flex items-center justify-center w-full max-w-4xl">
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                    >
                        <FaChevronLeft className="w-6 h-6 text-PrimaryGold" />
                    </button>

                    <div className="flex gap-4 w-full justify-center items-center overflow-hidden">
                        {[...Array(3)].map((_, index) => {
                            const productIndex = (currentIndex + index) % products.length;
                            const product = products[productIndex];
                            if (!product) return null;

                            return (
                                <Link
                                    to={`/productInfo/${product.productId}`}
                                    key={product.productId}
                                    className={`relative transition-transform duration-500 ease-in-out ${index === 1 ? 'scale-110 z-10' : 'scale-90 opacity-80'}`}
                                >
                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72">
                                        <img
                                            src={product.images[0]}
                                            alt={product.productName}
                                            className="w-full h-56 object-cover"
                                        />
                                        <div className="p-4">
                                            <h2 className="text-xl font-semibold text-Text transition-colors duration-300">
                                                {product.productName}
                                            </h2>
                                            <p className="text-sm text-Text/80">
                                                {product.description.substring(0, 100)}...
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                    >
                        <FaChevronRight className="w-6 h-6 text-PrimaryGold" />
                    </button>
                </div>
            )}
        </div>
    );
}
