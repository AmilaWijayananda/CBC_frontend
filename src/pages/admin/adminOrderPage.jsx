import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState({ status: "", note: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch orders. Please try again.");
        setLoading(false);
      });
  }, []);

  const calculateTotal = (orderedItems) => {
    return orderedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
  };

  const handleUpdateOrder = (order) => {
    setSelectedOrder(order);
    setUpdateData({ status: order.status, note: order.note || "" });
    setUpdateModalVisible(true);
  };

  const closeModals = () => {
    setSelectedOrder(null);
    setUpdateModalVisible(false);
    setDetailModalVisible(false);
  };

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${
          selectedOrder.orderId
        }`,
        { status: updateData.status, note: updateData.note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Order updated successfully.");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === selectedOrder.orderId
              ? { ...order, status: updateData.status, note: updateData.note }
              : order
          )
        );
        closeModals();
      })
      .catch((err) => {
        toast.error("Failed to update order. Please try again.");
      });
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-4 bg-Background">
      <h1 className="text-xl font-bold mb-4 text-Text">Admin Orders</h1>
      {loading ? (
        <p className="text-Text">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-Text">No orders found.</p>
      ) : (
        <table className="w-full max-w-4xl border border-Accent shadow-sm rounded-lg">
          <thead className="bg-PrimaryGold">
            <tr>
              <th className="p-2 border-b text-left text-Text">Order ID</th>
              <th className="p-2 border-b text-left text-Text">Status</th>
              <th className="p-2 border-b text-left text-Text">Date</th>
              <th className="p-2 border-b text-left text-Text">Total</th>
              <th className="p-2 border-b text-left text-Text">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-SecondaryBackground">
                <td className="p-2 border-b text-Text">{order.orderId}</td>
                <td className="p-2 border-b text-Text">{order.status}</td>
                <td className="p-2 border-b text-Text">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="p-2 border-b text-Text">
                  LKR {calculateTotal(order.orderedItems).toFixed(2)}
                </td>
                <td className="p-2 border-b">
                  <button
                    className="bg-Accent text-Text px-3 py-1 rounded-lg mr-2 hover:bg-SecondaryGold hover:text-white transition-colors duration-200"
                    onClick={() => handleViewDetails(order)}
                  >
                    View
                  </button>
                  <button
                    className="bg-PrimaryGold text-Text px-3 py-1 rounded-lg hover:bg-SecondaryGold hover:text-white transition-colors duration-200"
                    onClick={() => handleUpdateOrder(order)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Detail Modal */}
      {detailModalVisible && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-SecondaryBackground w-full max-w-md max-h-[90vh] rounded-lg shadow-lg flex flex-col">
            {/* Modal Header */}
            <h2 className="text-lg font-bold p-4 text-Text">Order Details</h2>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-4 flex-1">
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
              <h3 className="text-md font-bold mt-4 text-Text">
                Ordered Items:
              </h3>
              <div className="border-t border-Accent mt-2 pt-2">
                {selectedOrder.orderedItems.map((item, index) => (
                  <div key={index} className="mb-2 text-Text">
                    <p>
                      <span className="font-semibold">Name:</span> {item.name}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span> LKR{" "}
                      {item.price.toFixed(2)}
                    </p>
                    <p>
                      <span className="font-semibold">Quantity:</span>{" "}
                      {item.quantity}
                    </p>
                    <p>
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

            {/* Fixed Close Button */}
            <div className="p-4 border-t border-Accent">
              <button
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                onClick={closeModals}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {updateModalVisible && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-SecondaryBackground w-full max-w-md p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-Text">Update Order</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-Text">
                Status
              </label>
              <select
                value={updateData.status}
                onChange={(e) =>
                  setUpdateData({ ...updateData, status: e.target.value })
                }
                className="w-full p-2 border border-Accent rounded-lg focus:ring focus:ring-PrimaryGold focus:outline-none"
              >
                <option value="preparing">Preparing</option>
                <option value="cancelled">Cancelled</option>
                <option value="delivered">Delivered</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
                <option value="pended">Pended</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-Text">
                Note
              </label>
              <textarea
                value={updateData.note}
                onChange={(e) =>
                  setUpdateData({ ...updateData, note: e.target.value })
                }
                className="w-full p-2 border border-Accent rounded-lg focus:ring focus:ring-PrimaryGold focus:outline-none"
                rows="4"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                onClick={closeModals}
              >
                Cancel
              </button>
              <button
                className="bg-PrimaryGold text-Text px-4 py-2 rounded-lg hover:bg-SecondaryGold hover:text-white transition-colors duration-200"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
