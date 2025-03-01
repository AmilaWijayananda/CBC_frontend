import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ReviewFormPage() {
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);
  const [email, setEmail] = useState("");
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controls dropdown visibility

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to leave a review.");
      navigate("/login");
      return;
    }

    setLoadingStatus("loading");
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setEmail(res.data.email);
        setLoadingStatus("loaded");
      })
      .catch((err) => {
        toast.error("Failed to fetch user details.");
        console.error(err);
        setLoadingStatus("error");
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

    setLoadingStatus("loading");
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
        navigate("/review");
      })
      .catch((err) => {
        toast.error("Failed to submit review. Please try again.");
        console.error(err);
        setLoadingStatus("error");
      });
  }

  return (
    <div className="w-full h-full bg-Background p-4">
      {/* Loading Spinner */}
      {loadingStatus === "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-PrimaryGold"></div>
        </div>
      )}

      {/* Main Content */}
      {loadingStatus === "loaded" && (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-Text mb-4">Leave a Review</h1>
          <div className="mb-4">
            <label className="block font-medium text-Text mb-1">Review</label>
            <textarea
              className="w-full p-2 border border-PrimaryGold rounded-md focus:outline-none focus:border-SecondaryGold"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
            />
          </div>

          {/* Custom Stars Dropdown */}
          <div className="mb-4 relative">
            <label className="block font-medium text-Text mb-1">Stars</label>
            <div
              className="w-full p-2 border border-PrimaryGold rounded-md bg-white cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {stars} Stars
            </div>

            {dropdownOpen && (
              <ul className="absolute left-0 w-full bg-white border border-PrimaryGold shadow-md rounded-md mt-1 z-50">
                {[1, 2, 3, 4, 5].map((star) => (
                  <li
                    key={star}
                    className="p-2 hover:bg-SecondaryGold cursor-pointer text-center"
                    onClick={() => {
                      setStars(star);
                      setDropdownOpen(false);
                    }}
                  >
                    {star} Stars
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="bg-PrimaryGold text-Text font-semibold py-2 px-4 rounded-lg w-full hover:bg-SecondaryGold hover:shadow-lg transition-all duration-300"
            onClick={submitReview}
          >
            Submit Review
          </button>
        </div>
      )}

      {/* Error State */}
      {loadingStatus === "error" && (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-Text text-xl">Failed to load the form. Please try again.</p>
        </div>
      )}
    </div>
  );
}
