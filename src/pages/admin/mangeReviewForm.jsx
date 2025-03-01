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
            await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/review/${reviewId}`, reviewData, {
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
        <div className="min-h-screen bg-Background flex items-center justify-center p-4">
            <div className="bg-SecondaryBackground w-full max-w-6xl p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-Text text-center mb-6">
                    Manage Reviews
                </h1>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-PrimaryGold">
                                <th className="p-2 text-left w-1/12 text-Text">Review ID</th>
                                <th className="p-2 text-left w-2/12 text-Text">User</th>
                                <th className="p-2 text-left w-2/12 text-Text">Date</th>
                                <th className="p-2 text-left w-2/12 text-Text">Status</th>
                                <th className="p-2 text-left w-4/12 text-Text">Review</th>
                                <th className="p-2 text-left w-1/12 text-Text">Stars</th>
                                <th className="p-2 text-left w-2/12 text-Text">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review.reviewId} className="border-b hover:bg-SecondaryBackground">
                                    <td className="p-2 text-Text">{review.reviewId}</td>
                                    <td className="p-2 text-Text">{review.email}</td>
                                    <td className="p-2 text-Text">{review.date}</td>
                                    <td className="p-2">
                                        <select
                                            value={review.status}
                                            onChange={(e) => handleStatusChange(review.reviewId, e.target.value)}
                                            className="w-full px-2 py-1 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none text-sm"
                                        >
                                            <option value="Visible">Visible</option>
                                            <option value="Non-Visible">Non-Visible</option>
                                        </select>
                                    </td>
                                    <td className="p-2 text-Text">{review.review}</td>
                                    <td className="p-2 text-Text">{review.stars}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleSubmit(review.reviewId)}
                                            className="px-3 py-1 bg-PrimaryGold text-Text font-medium rounded-md hover:bg-SecondaryGold hover:text-white transition-colors duration-200 focus:ring focus:ring-PrimaryGold focus:outline-none text-sm"
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