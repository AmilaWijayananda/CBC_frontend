import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductCard(props) {
  const [isLoading, setIsLoading] = useState(true);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Link
      to={`/productInfo/${props.product.productId}`}
      className="w-full sm:w-[300px] h-[450px] m-4 sm:m-[70px] rounded-xl shadow-lg shadow-gray-500 hover:shadow-PrimaryGold hover:border-[3px] hover:border-PrimaryGold overflow-hidden flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105 bg-white"
    >
      {/* Loading Spinner */}
      {isLoading && (
        <div className="h-[60%] w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-PrimaryGold"></div>
        </div>
      )}

      {/* Product Image */}
      <img
        src={props.product.images[0]}
        alt={props.product.productName}
        className={`h-[60%] w-full object-cover ${isLoading ? "hidden" : "block"}`}
        onLoad={handleImageLoad}
      />

      {/* Product Details */}
      <div className="max-h-[40%] h-[40%] p-4 flex flex-col justify-between bg-white">
        {/* Product Name */}
        <h1 className="text-2xl font-bold text-Text text-center hover:text-PrimaryGold transition-colors duration-300">
          {props.product.productName}
        </h1>

        {/* Product ID */}
        <h2 className="text-lg text-Text/70 text-center">
          {props.product.productId}
        </h2>

        {/* Price Section */}
        <div className="text-center">
          {/* Discounted Price */}
          <p className="text-xl font-semibold text-Accent">
            LKR. {props.product.lastPrice.toFixed(2)}
          </p>

          {/* Original Price (if discounted) */}
          {props.product.lastPrice < props.product.price && (
            <p className="text-xl text-Text/70 font-semibold line-through">
              LKR. {props.product.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}