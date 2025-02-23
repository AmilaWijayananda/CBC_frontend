import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReviewCard from "../../components/reviewCard";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/review")
      .then((res) => {
        const filteredReviews = res.data.filter((review) => review.stars >= 1);
        setReviews(filteredReviews);
      })
      .catch((err) => console.error("Error loading reviews", err));
  }, []);

  function onReviewClick() {
    navigate("/leaveReview");
  }

  return (
    <div className="w-full h-full flex flex-col relative bg-Background">
      <div className="w-full h-full overflow-y-scroll flex flex-col items-center p-4">

        {/* Leave a Review Button */}
        <button
          onClick={onReviewClick}
          className="bg-accent hover:bg-accent-light text-PrimaryGold p-2 rounded-lg w-[300px] mt-6"
        >
          Leave a Review
        </button>

        {/* Review Section */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="animate-fade-in transition-all duration-1000"
            >
              <ReviewCard review={review} className="max-w-sm" />
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="w-full bg-green-300 h-[20%] mt-6">
          {/* Footer content goes here */}
        </div>
      </div>
    </div>
  );
}