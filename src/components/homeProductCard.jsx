// src/components/homeProductCard.jsx
import { Link } from 'react-router-dom';

export default function HomeProductCard({ product, isActive }) {
    if (!product) return null;

    return (
        <Link
            to={`/productInfo/${product.productId}`}
            className={`relative transition-transform duration-500 ease-in-out ${isActive ? 'scale-110 z-10' : 'scale-90 opacity-80'}`}
        >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-full h-56 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-Text transition-colors duration-300 hover:text-PrimaryGold">
                        {product.productName}
                    </h2>
                    <p className="text-sm text-Text/80">
                        {product.description.substring(0, 100)}...
                    </p>
                </div>
            </div>
        </Link>
    );
}
