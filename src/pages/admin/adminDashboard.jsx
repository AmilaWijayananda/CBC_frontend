import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [products, setProducts] = useState([]);

    // Fetch all customers
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/customers', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCustomers(response.data);
            } catch (error) {
                console.log(error);
                toast.error('Failed to load customers');
            }
        };

        fetchCustomers();
    }, []);

    // Fetch all orders
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
            })
            .catch((err) => {
                toast.error("Failed to fetch orders. Please try again.");
            });
    }, []);

    // Fetch all products
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                toast.error("Failed to fetch products. Please try again.");
            });
    }, []);

    // Fetch all reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/review', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setReviews(response.data);
            } catch (error) {
                console.log(error);
                toast.error('Failed to load reviews');
            }
        };

        fetchReviews();
    }, []);

    // Calculate counts
    const customersCount = customers.length;
    const reviewsCount = reviews.length;
    const productsCount = products.length;
    const ordersCount = orders.length;

    // Calculate order status counts
    const orderStatusCounts = {
        Preparing: orders.filter(order => order.status === "preparing").length,
        Cancelled: orders.filter(order => order.status === "cancelled").length,
        Delivered: orders.filter(order => order.status === "delivered").length,
        Completed: orders.filter(order => order.status === "completed").length,
        Paused: orders.filter(order => order.status === "paused").length,
        Pending: orders.filter(order => order.status === "Pending").length,
    };

    return (
        <div className="min-h-screen bg-Background p-6">
            <h1 className="text-3xl font-bold text-Text text-center mb-8">Admin Dashboard</h1>

            {/* Order Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                {Object.entries(orderStatusCounts).map(([status, count]) => (
                    <div key={status} className="bg-SecondaryBackground p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center justify-center">
                        <h2 className="text-xl font-semibold text-Text mb-2 text-center">Order {status}</h2>
                        <p className="text-4xl font-bold text-PrimaryGold">{count}</p>
                    </div>
                ))}
            </div>

            {/* Other Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Orders Card */}
                <div className="bg-SecondaryBackground p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-semibold text-Text mb-2 text-center">Total Orders</h2>
                    <p className="text-4xl font-bold text-PrimaryGold">{ordersCount}</p>
                </div>
                {/* Customers Card */}
                <div className="bg-SecondaryBackground p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-semibold text-Text mb-2 text-center">Total Customers</h2>
                    <p className="text-4xl font-bold text-PrimaryGold">{customersCount}</p>
                </div>

                {/* Reviews Card */}
                <div className="bg-SecondaryBackground p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-semibold text-Text mb-2 text-center">Total Reviews</h2>
                    <p className="text-4xl font-bold text-PrimaryGold">{reviewsCount}</p>
                </div>

                {/* Products Card */}
                <div className="bg-SecondaryBackground p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-semibold text-Text mb-2 text-center">Total Products</h2>
                    <p className="text-4xl font-bold text-PrimaryGold">{productsCount}</p>
                </div>
                
            </div>
        </div>
    );
}