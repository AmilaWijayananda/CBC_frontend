import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";
import ImageSlider from "../components/imageSlider";
import toast from "react-hot-toast";
import { addToCart } from "../utils/cartFunction";

export default function ProductOverview() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(productId);
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId).then((res) => {
      console.log(res.data);

      //if null
      if (res.data == null) {
        setStatus("not found");
      }
      if (res.data != null) {
        setProduct(res.data);
        setStatus("found");
      }
    });
  }, []);

  function onAddtoCartClick() {
    addToCart(product.productId, 1);
    toast.success(product.productId + " Added to cart");
  }

  function onBuyNowClick() {
    navigate("/shipping", {
      state: {
        items: [
          {
            productId: product.productId,
            qty: 1,
          },
        ],
      },
    });
  }

  return (
    <div className="w-full h-[calc(100vh-100px)] bg-Background">
      {status == "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-PrimaryGold"></div>
        </div>
      )}
      {status == "not found" && <ProductNotFound />}
      {status == "found" && (
        <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center p-4">
          {/* Product Image Slider (Mobile & Desktop) */}
          <div className="w-full lg:w-[35%] lg:h-full">
            <ImageSlider images={product.images} />
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-[65%] h-full p-4 flex flex-col  text-center lg:text-left">
            {/* Product Name */}
            <h1 className="text-2xl lg:text-3xl font-bold text-Text">
              {product.productName}
            </h1>

            {/* Alternate Names */}
            <h2 className="text-xl text-gray-500 mt-2">
              {product.altNames.join(" | ")}
            </h2>

            {/* Price Section */}
            <div className="mt-4">
              {product.price > product.lastPrice && (
                <span className="text-xl text-gray-500 line-through">
                  LKR. {product.price.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-Accent ml-2">
                LKR. {product.lastPrice.toFixed(2)}
              </span>
            </div>

            {/* Product Description */}
            <p className="text-lg text-Text mt-4 line-clamp-3">
              {product.description}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onAddtoCartClick}
                className="bg-PrimaryGold text-Text font-semibold py-2 px-4 rounded-lg hover:bg-SecondaryGold hover:shadow-lg transition-all duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={onBuyNowClick}
                className="border-2 border-PrimaryGold text-PrimaryGold font-semibold py-2 px-4 rounded-lg hover:bg-PrimaryGold hover:text-Text hover:shadow-lg transition-all duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}