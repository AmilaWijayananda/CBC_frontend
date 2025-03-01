import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading"); // Loading state
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to view orders.");
      return;
    }

    setLoadingStatus("loading"); // Set loading state to true
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoadingStatus("loaded"); // Set loading state to false
      })
      .catch((err) => {
        toast.error("Failed to fetch orders. Please try again.");
        setLoadingStatus("error"); // Set loading state to error
      });
  }, []);
  console.log(orders);

  const calculateTotal = (orderedItems) => {
    return orderedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-4 bg-Background overflow-y-auto">
      {/* Loading Spinner */}
      {loadingStatus === "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-PrimaryGold"></div>
        </div>
      )}

      {/* Main Content */}
      {loadingStatus === "loaded" && (
        <>
          <h1 className="text-2xl font-bold text-Text mb-4">My Orders</h1>
          {orders.length === 0 ? (
            <p className="text-Text">No orders found.</p>
          ) : (
            <div className="w-full max-w-4xl overflow-x-auto">
              <table className="w-full border border-PrimaryGold shadow-lg rounded-lg">
                <thead className="bg-SecondaryBackground">
                  <tr>
                    <th className="p-2 border-b border-PrimaryGold text-left text-Text">
                      Order ID
                    </th>
                    <th className="p-2 border-b border-PrimaryGold text-left text-Text">
                      Status
                    </th>
                    <th className="p-2 border-b border-PrimaryGold text-left text-Text">
                      Date
                    </th>
                    <th className="p-2 border-b border-PrimaryGold text-left text-Text">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.orderId}
                      className="hover:bg-SecondaryBackground transition-all duration-300 cursor-pointer"
                      onClick={() => handleRowClick(order)}
                    >
                      <td className="p-2 border-b border-PrimaryGold text-Text">
                        {order.orderId}
                      </td>
                      <td className="p-2 border-b border-PrimaryGold text-Text">
                        {order.status}
                      </td>
                      <td className="p-2 border-b border-PrimaryGold text-Text">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="p-2 border-b border-PrimaryGold text-Text">
                        LKR {calculateTotal(order.orderedItems).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Error State */}
      {loadingStatus === "error" && (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-Text text-xl">
            Failed to load orders. Please try again.
          </p>
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md max-h-[90vh] p-4 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-lg font-bold text-Text mb-4">Order Details</h2>
            <div className="overflow-y-auto flex-1">
              <p className="text-Text">
                <span className="font-semibold">Order ID:</span>{" "}
                {selectedOrder.orderId}
              </p>
              <p className="text-Text">
                <span className="font-semibold">Status:</span>{" "}
                {selectedOrder.status}
              </p>
              <p className="text-Text">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(selectedOrder.date).toLocaleString()}
              </p>
              <p className="text-Text">
                <span className="font-semibold">Name:</span>{" "}
                {selectedOrder.name}
              </p>
              <p className="text-Text">
                <span className="font-semibold">Address:</span>{" "}
                {selectedOrder.address}
              </p>
              <p className="text-Text">
                <span className="font-semibold">Phone:</span>{" "}
                {selectedOrder.phone}
              </p>
              <p className="text-Text">
                <span className="font-semibold">Note:</span>{" "}
                {selectedOrder.note || "None"}
              </p>
              <h3 className="text-md font-bold text-Text mt-4">
                Ordered Items:
              </h3>
              <div className="border-t border-PrimaryGold mt-2 pt-2">
                {selectedOrder.orderedItems.map((item, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-Text">
                      <span className="font-semibold">Name:</span> {item.name}
                    </p>
                    <p className="text-Text">
                      <span className="font-semibold">Price:</span> LKR{" "}
                      {item.price.toFixed(2)}
                    </p>
                    <p className="text-Text">
                      <span className="font-semibold">Quantity:</span>{" "}
                      {item.quantity}
                    </p>
                    <p className="text-Text">
                      <span className="font-semibold">Subtotal:</span> LKR{" "}
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <img
                      src={item.Image.split(",")[0]} // Extracting the first image
                      alt={item.name}
                      className="w-16 h-16 mt-1 rounded-md object-cover"
                      onError={(e) => {
                        e.target.src = "/path/to/default-image.png"; // Fallback image if the main image fails to load
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-PrimaryGold text-Text font-semibold px-4 py-2 rounded-lg hover:bg-SecondaryGold hover:shadow-lg transition-all duration-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
