import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HomeProductCard from "../../components/homeProductCard";
import BannerCard from "../../components/bannerCard";
import ReviewCard from "../../components/reviewCard";
import ImageCard from "../../components/imagesCard";
import HomeNoteCard from "../../components/homeNoteCard";
import Footer from "../../components/footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [BannerLoadingStatus, setBannerLoadingStatus] = useState("loading");
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [notes, setNotes] = useState([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const noteContentRef = useRef(null);
  const [isScrollDelayed, setIsScrollDelayed] = useState(false);

  // Intersection Observer for scroll animations
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Fetch banners
  useEffect(() => {
    if (BannerLoadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/banner")
        .then((res) => {
          setBanners(res.data);
          setBannerLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading banner"));
    }
  }, []);

  // Auto-change banners
  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  // Fetch products
  useEffect(() => {
    if (loadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setLoadingStatus("loaded");
          const images = res.data.flatMap((product) => product.images);
          setAllImages(images);
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }, []);

  // Auto-change images
  useEffect(() => {
    if (allImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImgIndex((prevIndex) => (prevIndex + 1) % allImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [allImages]);

  // Fetch reviews
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

  // Auto-change reviews
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

  // Fetch notes
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

  // Auto-change notes
  useEffect(() => {
    if (notes.length > 0 && !isHovered) {
      const interval = setInterval(() => {
        setCurrentNoteIndex((prevIndex) => (prevIndex + 1) % notes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [notes, isHovered]);

  // Handle note click
  const handleNoteClick = () => {
    if (noteContentRef.current) {
      noteContentRef.current.scrollTop = 0;
    }
    setCurrentNoteIndex((prevIndex) => (prevIndex + 1) % notes.length);
    setIsScrollDelayed(true);
    setTimeout(() => {
      setIsScrollDelayed(false);
    }, 3000);
  };

  // Handle hover
  const handleHover = () => {
    setIsHovered(true);
    setIsScrollDelayed(true);
    setTimeout(() => {
      setIsScrollDelayed(false);
    }, 3000);
  };

  // Handle leave
  const handleLeave = () => {
    setIsHovered(false);
    setIsScrollDelayed(false);
  };

  // Product carousel navigation
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  return (
    <div className="w-full h-full flex flex-col relative  bg-Background">
      <div className="w-full h-full overflow-y-scroll flex flex-wrap overflow-x-hidden justify-center relative">
        {/* Header Section */}
        <div
          ref={(el) => (sectionRefs.current[0] = el)}
          className="w-full bg-Background h-[10%] animate-fade-in"
        >
          <h1 className="text-xl md:text-4xl font-bold text-Text text-center mb-4 pt-3 px-4">
            Welcome to Crystal Beauty Clear Store
          </h1>
        </div>

        {/* Auto-Sliding Banner Section */}
        {BannerLoadingStatus === "loaded" && banners.length > 0 && (
          <div
            ref={(el) => (sectionRefs.current[1] = el)}
            className="w-full h-[60%] flex items-center justify-center overflow-hidden border-y-4 border-PrimaryGold mt-4 mb-4 shadow-lg shadow-yellow-500/50"
          >
            <BannerCard banner={banners[currentBannerIndex]} />
          </div>
        )}

        {/* Product Carousel Section */}
        {loadingStatus === "loaded" && (
          <div
            ref={(el) => (sectionRefs.current[2] = el)}
            className="w-full h-[80%] flex items-center justify-center"
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

        {/* Middle Section */}
        <div
          ref={(el) => (sectionRefs.current[3] = el)}
          className="w-full min-h-[600px] lg:min-h-[400px] mt-6 mb-6 flex flex-col lg:flex-row"
        >
          {/* Image Section (30%) */}
          <div className="w-full lg:w-[30%] h-full bg-Background flex items-center justify-center p-4">
            <div className="w-96 h-96 rounded-full overflow-hidden border-2 border-PrimaryGold shadow-lg shadow-yellow-500/50">
              {allImages.length > 0 && (
                <ImageCard image={allImages[currentImgIndex]} />
              )}
            </div>
          </div>

          {/* Notes Section (70%) */}
          <div className="w-full lg:w-[70%] h-full p-4">
            {notes.length > 0 && (
              <div
                className="relative h-[400px] lg:h-full overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer border-2 border-PrimaryGold"
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
                  key={currentNoteIndex}
                >
                  <div ref={noteContentRef} className="h-full overflow-y-auto">
                    <HomeNoteCard note={notes[currentNoteIndex]} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Review Section */}
        <div
          ref={(el) => (sectionRefs.current[4] = el)}
          className="w-full h-[500px] lg:h-[400px] flex items-center justify-center p-4 bg-SecondaryBackground border-t-2 border-PrimaryGold shadow-lg overflow-y-auto"
        >
          <div className="w-full max-w-5xl flex flex-col lg:flex-row justify-around gap-4">
            {visibleReviews.map((review, index) => (
              <div
                key={index}
                className="animate-fade-in transition-all duration-1000 w-full lg:w-1/3"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div
          ref={(el) => (sectionRefs.current[5] = el)}
          className="w-full h-[40%] bg-Background border-t-2 border-PrimaryGold shadow-lg"
        >
          <Footer />
        </div>
      </div>
    </div>
  );
}
