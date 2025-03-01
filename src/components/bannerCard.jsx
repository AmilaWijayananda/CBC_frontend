import { useState, useEffect } from "react";

export default function BannerCard(props) {
  const [isLoading, setIsLoading] = useState(true);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden bg-Background">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-PrimaryGold"></div>
        </div>
      )}

      {/* Banner Image */}
      <img
        src={props.banner.images[0]}
        alt="Banner"
        className={`h-full w-full object-cover ${
          isLoading ? "hidden" : "block"
        }`}
        onLoad={handleImageLoad}
      />
    </div>
  );
}