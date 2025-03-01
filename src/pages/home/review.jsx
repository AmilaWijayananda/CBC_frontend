import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReviewCard from "../../components/reviewCard";
import Footer from "../../components/footer";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading"); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  // Fetch reviews from the backend
  const fetchReviews = () => {
    setLoadingStatus("loading"); // Set loading state to true
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/review")
      .then((res) => {
        const filteredReviews = res.data.filter(
          (review) => review.stars >= 1 && review.status === "Visible"
        );
        setReviews(filteredReviews);
        setLoadingStatus("loaded"); // Set loading state to false
      })
      .catch((err) => {
        console.error("Error loading reviews", err);
        setLoadingStatus("error"); // Set loading state to error
      });
  };

  // Handle review status change (e.g., when admin changes visibility)
  const handleReviewStatusChange = () => {
    fetchReviews(); // Re-fetch reviews to update the visible list
  };

  function onReviewClick() {
    navigate("/leaveReview");
  }

  return (
    <div className="w-full h-full flex flex-col bg-Background overflow-y-auto">
      {/* Loading Spinner */}
      {loadingStatus === "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-PrimaryGold"></div>
        </div>
      )}

      {/* Main Content */}
      {loadingStatus === "loaded" && (
        <div className="w-full h-full flex flex-col items-center">
          
            {/* Leave a Review Button */}
            <button
              onClick={onReviewClick}
              className="bg-PrimaryGold text-Text font-semibold py-2 px-4 rounded-lg hover:bg-SecondaryGold hover:shadow-lg transition-all duration-300 w-full max-w-[300px] mt-6"
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
                  <ReviewCard
                    review={review}
                    className="max-w-sm"
                    onStatusChange={handleReviewStatusChange} // Pass callback to handle status change
                  />
                </div>
              ))}
            
          </div>
          {/* Footer Section */}
          {loadingStatus === "loaded" && (
            <div className="w-full bg-Background border-t-2 border-PrimaryGold shadow-lg">
              <Footer />
            </div>
          )}
        </div>
      )}

      {/* Error State */}
      {loadingStatus === "error" && (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-Text text-xl">
            Failed to load reviews. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}
