import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ReviewPage() {
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to leave a review.");
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch((err) => {
        toast.error("Failed to fetch user details.");
        console.error(err);
      });
  }, [navigate]);

  function submitReview() {
    if (!review.trim()) {
      toast.error("Please enter your review.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to submit a review.");
      return;
    }

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/review",
        { email, review, stars },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        toast.success("Review submitted successfully!");
        navigate("/");
      })
      .catch((err) => {
        toast.error("Failed to submit review. Please try again.");
        console.error(err);
      });
  }

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Leave a Review</h1>
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Review</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Stars</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={stars}
            onChange={(e) => setStars(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star} Stars</option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
          onClick={submitReview}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
