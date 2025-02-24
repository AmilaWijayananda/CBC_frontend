import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HomeProductCard from "../../components/homeProductCard";
import BannerCard from "../../components/bannerCard";
import ReviewCard from "../../components/reviewCard";
import ImageCard from "../../components/imagesCard";
import HomeNoteCard from "../../components/homeNoteCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [BannerLoadingStatus, setBannerLoadingStatus] = useState("loading");
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [allImages, setAllImages] = useState([]); // Flattened array of all images
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // New state for notes
  const [notes, setNotes] = useState([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const noteContentRef = useRef(null);
  const [isScrollDelayed, setIsScrollDelayed] = useState(false);

  //const [imgLoadingStatus, setImgLoadingStatus] = useState('loading');
  //const [images, setImages] = useState([]);
  //const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (BannerLoadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/banner")
        .then((res) => {
          console.log(res.data);
          setBanners(res.data);
          setBannerLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading banner"));
    }
  }, []);

  // Auto-change banners every 4 seconds
  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 4000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [banners]);

  useEffect(() => {
    if (loadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");

          // Flatten all product images into a single array
          const images = res.data.flatMap((product) => product.images);
          setAllImages(images);
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }, []);

  // Auto-change images every 5 seconds
  useEffect(() => {
    if (allImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImgIndex((prevIndex) => (prevIndex + 1) % allImages.length);
      }, 5000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [allImages]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/review")
      .then((res) => {
        const filteredReviews = res.data.filter((review) => review.stars > 3);
        setReviews(filteredReviews);
        setVisibleReviews(filteredReviews.slice(0, 3));
      })
      .catch((err) => console.error("Error loading reviews", err));
  }, []);

  useEffect(() => {
    if (reviews.length > 3) {
      const interval = setInterval(() => {
        setVisibleReviews((prev) => {
          const nextIndex = (reviews.indexOf(prev[0]) + 3) % reviews.length;
          return reviews.slice(nextIndex, nextIndex + 3);
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Fetch notes from the backend
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/note")
      .then((res) => {
        const filteredNotes = res.data.filter(
          (note) => note.page === "Home" && note.status === "Visible"
        );
        setNotes(filteredNotes);
      })
      .catch((err) => toast.error("Error loading notes"));
  }, []);

  // Automatically change notes every 5 seconds
  useEffect(() => {
    if (notes.length > 0 && !isHovered) {
      const interval = setInterval(() => {
        setCurrentNoteIndex((prevIndex) => (prevIndex + 1) % notes.length);
      }, 5000); // Change every 5 seconds
      return () => clearInterval(interval);
    }
  }, [notes, isHovered]);

  // Handle click to change to the next note
  const handleNoteClick = () => {
    // Reset scroll position to top
    if (noteContentRef.current) {
      noteContentRef.current.scrollTop = 0; // Reset scroll position
    }
    // Change to the next note
    setCurrentNoteIndex((prevIndex) => (prevIndex + 1) % notes.length);
    setIsScrollDelayed(true); // Enable scroll delay
    setTimeout(() => {
      setIsScrollDelayed(false); // Disable scroll delay after 3 seconds
    }, 3000);
  };

  // Handle hover to pause automatic change and enable auto-scroll
  const handleHover = () => {
    setIsHovered(true);
    setIsScrollDelayed(true); // Enable scroll delay
    setTimeout(() => {
      setIsScrollDelayed(false); // Disable scroll delay after 3 seconds
    }, 3000);
  };

  const handleLeave = () => {
    setIsHovered(false);
    setIsScrollDelayed(false); // Disable scroll delay immediately
  };

  return (
    <div className="w-full h-full flex flex-col relative bg-Background">
      <div className="w-full h-full overflow-y-scroll flex flex-wrap justify-center relative">
        {/* Header Section */}
        <div className="w-full bg-Background h-[10%]">
          <h1 className="text-4xl font-bold text-Text text-center mb-4 pt-3 animate-fade-in">
            Welcome to Crystal Beauty Clear Store
          </h1>
        </div>

        {/* Auto-Sliding Banner Section */}
        {BannerLoadingStatus === "loaded" && banners.length > 0 && (
          <div className="w-full h-[60%] flex items-center justify-center overflow-hidden border-y-4 border-PrimaryGold mt-4 mb-4 shadow-lg shadow-yellow-500/50 ">
            <BannerCard banner={banners[currentBannerIndex]} />
          </div>
        )}

        {BannerLoadingStatus === "loading" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-2 border-gray-500 border-b-accent border-b-4"></div>
          </div>
        )}

        {/* Product Carousel Section */}
        {loadingStatus === "loaded" && (
          <div
            className="w-full h-[70%] flex items-center justify-center"
            style={{
              backgroundImage: "url('/public/B_Image1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-3 lg:left-40 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform z-20"
            >
              <FaChevronLeft className="w-6 h-6 text-PrimaryGold" />
            </button>

            {/* Product Cards */}
            <div className="flex gap-10 w-full justify-center items-center">
              {[...Array(3)].map((_, index) => {
                const productIndex = (currentIndex + index) % products.length;
                return (
                  <HomeProductCard
                    key={productIndex}
                    product={products[productIndex]}
                    isActive={index === 1}
                  />
                );
              })}
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-3 lg:right-40 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform z-20"
            >
              <FaChevronRight className="w-6 h-6 text-PrimaryGold" />
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loadingStatus === "loading" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-2 border-gray-500 border-b-accent border-b-4"></div>
          </div>
        )}

        {/* Middle Section */}
        <div className="w-full bg-green-500 h-[80%] mt-6 mb-6 flex flex-horizontal">
          {/* Image Section (30%) */}
          <div className="w-[30%] h-full bg-Background flex items-center justify-center">
            {/* Fixed Circular Container */}
            <div className="w-96 h-96 rounded-full overflow-hidden border-2 border-PrimaryGold shadow-lg shadow-yellow-500/50">
              {allImages.length > 0 && (
                <ImageCard image={allImages[currentImgIndex]} />
              )}
            </div>
          </div>

          {/* Other Content Section (70%) */}
          <div className="w-[70%] h-full bg-pink-500 p-6">
            {/* Notes Section */}
            {notes.length > 0 && (
              <div
                className="relative h-64 overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
                onClick={handleNoteClick}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                <div
                  className={`absolute top-0 left-0 w-full transition-transform duration-1000 ${
                    isHovered && !isScrollDelayed
                      ? "translate-y-full"
                      : "translate-y-0"
                  }`}
                  style={{
                    animation:
                      isHovered && !isScrollDelayed
                        ? "scroll 10s linear infinite"
                        : "none",
                  }}
                  key={currentNoteIndex} // Force re-render when note changes
                >
                  <div ref={noteContentRef} className="h-64 overflow-y-auto">
                    <HomeNoteCard note={notes[currentNoteIndex]} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* review Section */}
        <div className="w-full bg-yellow-300 h-[40%] flex items-center justify-center p-4">
          <div className="w-full max-w-5xl flex justify-around gap-4 overflow-hidden">
            {visibleReviews.map((review, index) => (
              <div
                key={index}
                className="animate-fade-in transition-all duration-1000"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="w-full bg-green-300 h-[40%]">
          {/* Footer content goes here */}
        </div>
      </div>
    </div>
  );
}
