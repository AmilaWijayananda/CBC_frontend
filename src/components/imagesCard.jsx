import { useState } from "react";

export default function ImageCard({ image }) {
  const [isLoading, setIsLoading] = useState(true);

  if (!image) return null;

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full bg-Background flex items-center justify-center">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-PrimaryGold"></div>
        </div>
      )}

      {/* Image */}
      <img
        src={image}
        alt="Product"
        className={`w-full h-full object-cover ${
          isLoading ? "hidden" : "block"
        }`}
        onLoad={handleImageLoad}
      />
    </div>
  );
}