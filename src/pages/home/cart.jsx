import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../components/cartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("loading"); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingStatus("loading"); // Set loading state to true
    const cartItems = loadCart();
    setCart(cartItems);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: cartItems,
      })
      .then((res) => {
        if (res.data.total != null) {
          setTotal(res.data.total);
          setLabeledTotal(res.data.labeledTotal);
        }
        setLoadingStatus("loaded"); // Set loading state to false
      })
      .catch((err) => {
        console.error("Error fetching order quote:", err);
        setLoadingStatus("error"); // Set loading state to error
      });
  }, []);

  function onOrderCheckOutClick() {
    navigate("/shipping", {
      state: {
        items: loadCart(),
      },
    });
  }

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col bg-Background p-4">
      {/* Loading Spinner */}
      {loadingStatus === "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-PrimaryGold"></div>
        </div>
      )}

      {/* Main Content */}
      {loadingStatus === "loaded" && (
        <>
          {/* Cart Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse border border-PrimaryGold">
              <thead>
                <tr className="bg-SecondaryBackground">
                  <th className="border border-PrimaryGold p-2 text-Text">Image</th>
                  <th className="border border-PrimaryGold p-2 text-Text">Product Name</th>
                  <th className="border border-PrimaryGold p-2 text-Text">Product ID</th>
                  <th className="border border-PrimaryGold p-2 text-Text">Qty</th>
                  <th className="border border-PrimaryGold p-2 text-Text">Price</th>
                  <th className="border border-PrimaryGold p-2 text-Text">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <CartCard
                    key={item.productId}
                    productId={item.productId}
                    qty={item.qty}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Section */}
          <div className="w-full text-center mt-6">
            <h1 className="text-2xl font-bold text-Text">
              Total: LKR. {labeledTotal.toFixed(2)}
            </h1>
            <h1 className="text-2xl font-bold text-Text">
              Discount: LKR. {(labeledTotal - total).toFixed(2)}
            </h1>
            <h1 className="text-2xl font-bold text-Text mb-6">
              Grand Total: LKR. {total.toFixed(2)}
            </h1>
          </div>

          {/* Checkout Button */}
          <div className="w-full flex justify-center">
            <button
              onClick={onOrderCheckOutClick}
              className="bg-PrimaryGold text-Text font-semibold py-2 px-4 rounded-lg hover:bg-SecondaryGold hover:shadow-lg transition-all duration-300"
            >
              Checkout
            </button>
          </div>
        </>
      )}

      {/* Error State */}
      {loadingStatus === "error" && (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-Text text-xl">Failed to load cart data. Please try again.</p>
        </div>
      )}
    </div>
  );
}