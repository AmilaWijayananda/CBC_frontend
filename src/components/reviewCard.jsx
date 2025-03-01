import { FaStar, FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function ReviewCard({ review }) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading effect (replace with actual data fetching logic if needed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate 1 second loading delay
    return () => clearTimeout(timer);
  }, []);

  // Check if review meets the visibility and rating criteria
  if (review.status !== "Visible") {
    return null;
  }

  // Mask email (show part before "@" and *** at the end)
  const maskedEmail = review.email.split("@")[0] + "***";

  // Generate star rating (filled stars for rating, outlined for remaining)
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-PrimaryGold" />
        ) : (
          <FaRegStar key={i} className="text-Text/30" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-4 flex flex-col items-center space-y-2 border border-Text/20 hover:border-PrimaryGold transition-all duration-300">
      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-PrimaryGold"></div>
        </div>
      ) : (
        <>
          {/* Reviewer Email */}
          <h1 className="text-lg font-bold text-Text hover:text-PrimaryGold transition-colors duration-300">
            {maskedEmail}
          </h1>

          {/* Review Date */}
          <h2 className="text-sm text-Text/70">
            {new Date(review.date).toLocaleDateString()}
          </h2>

          {/* Review Text */}
          <p className="text-Text text-center italic">"{review.review}"</p>

          {/* Star Rating */}
          <div className="flex items-center space-x-1">{renderStars(review.stars)}</div>

          {/* Rating Text */}
          <span className="text-PrimaryGold font-bold">
            {review.stars} / 5
          </span>
        </>
      )}
    </div>
  );
}