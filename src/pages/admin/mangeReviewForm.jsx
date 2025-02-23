import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export default function ManageReviewForm() {
    const location = useLocation();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Load all reviews at once
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('http://localhost:5000/api/review', {
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

    const handleStatusChange = (reviewId, newStatus) => {
        const updatedReviews = reviews.map(review =>
            review.reviewId === reviewId ? { ...review, status: newStatus } : review
        );
        setReviews(updatedReviews);
    };

    const handleSubmit = async (reviewId) => {
        const reviewToUpdate = reviews.find(review => review.reviewId === reviewId);
        const reviewData = {
            reviewId: reviewToUpdate.reviewId,
            email: reviewToUpdate.email,
            date: reviewToUpdate.date,
            status: reviewToUpdate.status,
            review: reviewToUpdate.review,
            stars: reviewToUpdate.stars
        };

        const token = localStorage.getItem("token");

        try {
            await axios.put(`http://localhost:5000/api/review/${reviewId}`, reviewData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Review Updated Successfully");
        } catch (error) {
            console.log(error);
            toast.error('Failed to update review');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-6xl p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Manage Reviews
                </h1>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 text-left w-1/12">Review ID</th>
                                <th className="p-2 text-left w-2/12">User</th>
                                <th className="p-2 text-left w-2/12">Date</th>
                                <th className="p-2 text-left w-2/12">Status</th>
                                <th className="p-2 text-left w-4/12">Review</th>
                                <th className="p-2 text-left w-1/12">Stars</th>
                                <th className="p-2 text-left w-2/12">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review.reviewId} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{review.reviewId}</td>
                                    <td className="p-2">{review.email}</td>
                                    <td className="p-2">{review.date}</td>
                                    <td className="p-2">
                                        <select
                                            value={review.status}
                                            onChange={(e) => handleStatusChange(review.reviewId, e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                        >
                                            <option value="Visible">Visible</option>
                                            <option value="Non-Visible">Non-Visible</option>
                                        </select>
                                    </td>
                                    <td className="p-2">{review.review}</td>
                                    <td className="p-2">{review.stars}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleSubmit(review.reviewId)}
                                            className="px-3 py-1 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none text-sm"
                                        >
                                            Update Status
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}