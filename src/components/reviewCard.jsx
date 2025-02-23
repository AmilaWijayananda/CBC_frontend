import { FaStar, FaRegStar } from "react-icons/fa";

export default function ReviewCard({ review }) {
  // Check if review meets the visibility and rating criteria
  if (review.status !== "Visible" || review.stars <= 3) {
    return null;
  }

  // Mask email (show part before "@" and *** at the end)
  const maskedEmail = review.email.split("@")[0] + "***";

  // Generate star rating (filled stars for rating, outlined for remaining)
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} className="text-yellow-500" /> : <FaRegStar key={i} className="text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-4 flex flex-col items-center space-y-2 border border-gray-200">
      <h1 className="text-lg font-bold text-gray-700">{maskedEmail}</h1>
      <h2 className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</h2>
      <p className="text-gray-800 text-center italic">"{review.review}"</p>
      <div className="flex items-center space-x-1">{renderStars(review.stars)}</div>
      <span className="text-yellow-600 font-bold">{review.stars} / 5</span>
    </div>
  );
}
