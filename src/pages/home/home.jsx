import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HomeProductCard from '../../components/homeProductCard';


export default function Home() {
    const [products, setProducts] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState('loading');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (loadingStatus === "loading") {
          axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
            .then((res) => {
              console.log(res.data);
              setProducts(res.data);
              setLoadingStatus("loaded");
            })
            .catch((err) => toast.error("Error loading products"));
        }
      }, []);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
        
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
        
    };

    return (
        <div className="w-full h-full flex flex-col relative bg-red-500">
            <div className="w-full h-full overflow-y-scroll flex flex-wrap justify-center relative">
                {/* Header Section */}
                <div className='w-full bg-blue-300 h-[20%]'>
                    <h1 className="text-4xl font-bold text-Text text-center mb-4 pt-8 animate-fade-in">
                        Welcome to Crystal Beauty Clear Store
                    </h1>
                </div>
    
                {/* Product Carousel Section */}
                {loadingStatus === "loaded" && (
                    <div className='w-full h-[70%] flex items-center justify-center'
                    style={{
                        backgroundImage: "url('/public/B_Image1.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}>

                        {/* Left Arrow */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-3 lg:left-40 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform z-20"
                        >
                            <FaChevronLeft className="w-6 h-6 text-PrimaryGold" />
                        </button>
    
                        {/* Product Cards */}
                        <div className="flex gap-10 w-full justify-center items-center">
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
    
                        {/* Right Arrow */}
                        <button
                            onClick={nextSlide}
                            className="absolute right-3 lg:right-40 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform z-20"
                        >
                            <FaChevronRight className="w-6 h-6 text-PrimaryGold" />
                        </button>
                    </div>
                )}
    
                {/* Loading Spinner */}
                {loadingStatus === "loading" && (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-2 border-gray-500 border-b-accent border-b-4"></div>
                    </div>
                )}
    
                {/* Footer Section */}
                <div className='w-full bg-yellow-300 h-[40%]'>
                    {/* Footer content goes here */}
                </div>
            </div>
        </div>
    );
}