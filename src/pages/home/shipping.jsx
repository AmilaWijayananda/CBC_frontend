import { useLocation, useNavigate } from "react-router-dom";
import CartCard from "../../components/cartCard";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShippingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.items;
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!cart) {
      toast.error("No items received");
      navigate("/cart");
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: cart,
      })
      .then((res) => {
        if (res.data.total != null) {
          setTotal(res.data.total);
          setLabeledTotal(res.data.labeledTotal);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch order quote. Please try again.");
        console.error(err);
      });
  }, [cart, navigate]);

  function validateInputs() {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!address.trim()) {
      toast.error("Please enter your address.");
      return false;
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  }

  function createOrder() {
    if (!validateInputs()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        {
          orderedItems: cart,
          name,
          address,
          phone,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        toast.success("Order placed successfully!");
        navigate("/orders");
      })
      .catch((err) => {
        toast.error("Failed to place order. Please try again.");
        console.error("Error creating order:", err);
      });
  }

  if (!cart) {
    return null;
  }

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-wrap bg-Background p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Shipping Details Section */}
        <h1 className="text-2xl font-bold text-Text mb-4">Shipping Details</h1>
        <div className="mb-4">
          <label className="block font-medium text-Text mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-PrimaryGold rounded-md focus:outline-none focus:border-SecondaryGold"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-Text mb-1">Address</label>
          <textarea
            className="w-full p-2 border border-PrimaryGold rounded-md focus:outline-none focus:border-SecondaryGold"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-Text mb-1">Phone</label>
          <input
            type="text"
            className="w-full p-2 border border-PrimaryGold rounded-md focus:outline-none focus:border-SecondaryGold"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        {/* Order Summary Section */}
        <h2 className="text-xl font-bold text-Text mt-6 mb-4">Order Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-PrimaryGold mb-4">
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
        <div className="mt-4 text-center text-left">
          <h1 className="text-lg font-bold text-Text mb-2">
            Total: LKR. {labeledTotal.toFixed(2)}
          </h1>
          <h1 className="text-lg font-bold text-Text mb-2">
            Discount: LKR. {(labeledTotal - total).toFixed(2)}
          </h1>
          <h1 className="text-lg font-bold text-Text mb-4">
            Grand Total: LKR. {total.toFixed(2)}
          </h1>
        </div>

        {/* Checkout Button */}
        <button
          className="bg-PrimaryGold text-Text font-semibold py-2 px-4 rounded-lg w-full hover:bg-SecondaryGold hover:shadow-lg transition-all duration-300"
          onClick={createOrder}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}