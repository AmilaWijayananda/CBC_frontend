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
    axios.get("http://localhost:5000/api/products/" + productId).then((res) => {
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

  function onBuyNowClick(){
    navigate("/shipping",{
      state:{
        items: [
          {
            productId: product.productId,
            qty: 1
          }
        ]
      }
    })
  }

  return (
    <div className="w-full h-[calc(100vh-100px)]">
      {status == "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )}
      {status == "not found" && <ProductNotFound />}
      {status == "found" && (
        <div className="w-full h-full flex flex-col lg:flex-row  items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800 lg:hidden">
            {product.productName}
          </h1>
          <p className="text-xl text-gray-600 lg:hidden">
            {product.price > product.lastPrice && (
              <span className="line-through text-red-500">
                LKR.{product.price}
              </span>
            )}{" "}
            <span>{"LKR." + product.lastPrice}</span>
          </p>
          <div className="w-[100%] lg:w-[35%] lg:h-full">
            <ImageSlider images={product.images} />
          </div>
          <div className="w-[65%] h-full p-4">
            <h1 className="text-3xl font-bold hidden lg:block">{product.productName}</h1>
            <h1 className="text-2xl font-bold text-gray-500">
              {product.altNames.join(" | ")}
            </h1>
            <p className="text-xl line-clamp-3">{product.description}</p>
            <p className="text-xl text-gray-600 hidden lg:block">
              {product.price > product.lastPrice && (
                <span className="line-through text-red-500">
                  LKR.{product.price}
                </span>
              )}{" "}
              <span>{"LKR." + product.lastPrice}</span>
            </p>
            <button
              onClick={onAddtoCartClick}
              className="bg-accent text-white p-2 rounded-lg"
            >
              Add to cart
            </button>
            <button
              onClick={onBuyNowClick}
              className=" text-accent border mx-1 border-accent p-2 rounded-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
