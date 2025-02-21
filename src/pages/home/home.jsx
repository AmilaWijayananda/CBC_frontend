import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HomeProductCard from '../../components/homeProductCard';


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
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    return (
        
        <div className="min-h-screen bg-Background flex flex-col items-center relative">
            <h1 className="text-4xl font-bold text-Text text-center mb-4 pt-8 animate-fade-in">
                Welcome to Crystal Beauty Clear Store
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-PrimaryGold"></div>
                </div>
            ) : (
                <div className="relative flex items-center justify-center w-full max-w-4xl my-8">
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                    >
                        <FaChevronLeft className="w-6 h-6 text-PrimaryGold" />
                    </button>

                    <div className="flex gap-4 w-full justify-center items-center overflow-hidden">
                        {[...Array(3)].map((_, index) => {
                            const productIndex = (currentIndex + index) % products.length;
                            return (
                                <HomeProductCard 
                                    key={productIndex} 
                                    product={products[productIndex]} 
                                    isActive={index === 1} 
                                />
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