import { useState } from "react";

export default function ImageSlider({ images }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-full aspect-square flex items-center flex-col relative rounded-lg overflow-hidden shadow-lg">
      {/* Main Image */}
      <img
        src={images[activeImage]}
        alt={`Product Image ${activeImage + 1}`}
        className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
      />

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 w-full h-[100px] backdrop-blur-lg bg-Background/70">
        <div className="w-full h-full flex items-center justify-center overflow-x-auto p-2">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-16 h-16 cursor-pointer mx-2 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === activeImage
                  ? "border-PrimaryGold shadow-lg shadow-PrimaryGold/50"
                  : "border-transparent hover:border-PrimaryGold"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}