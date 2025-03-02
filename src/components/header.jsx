import { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import NavSlider from "./NavSlider";

export default function Header() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef(null); // Ref for closing dropdown on outside click

  // Fetch user data on component mount
  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");

    if (!token) return;

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal, // Attach signal to cancel request on unmount
      })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null)); // Set user to null on failure

    return () => controller.abort(); // Cleanup function
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login"; // Redirect to login page
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  return (
    <>
      {/* NavSlider */}
      {isSliderOpen && (
        <NavSlider
          closeSlider={() => setIsSliderOpen(false)}
          user={user}
          handleLogout={handleLogout}
        />
      )}

      <header className="w-full h-[100px] relative flex justify-center items-center shadow-lg bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200">
        
        {/* Logo */}
        <Link to="/" className="absolute left-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="cursor-pointer h-[80px] w-[80px] rounded-full hover:scale-105 transition-transform duration-300 border-2 border-amber-500 shadow-lg"
          />
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <RxHamburgerMenu
          onClick={() => setIsSliderOpen(true)}
          className="text-3xl absolute cursor-pointer text-amber-700 right-4 lg:hidden hover:text-amber-900 transition-colors duration-300"
        />

        {/* Navigation Links (Desktop) */}
        <nav className="h-full flex items-center w-[700px] justify-between hidden lg:flex px-1">
          {[
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "Cart", path: "/cart" },
            { name: "My Orders", path: "/orders" },
            { name: "About Us", path: "/about" },
            { name: "Contact", path: "/contact" },
            { name: "Reviews", path: "/review" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-amber-800 text-xl font-semibold hover:text-amber-900 hover:border-b-2 border-amber-900 transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Profile Section (Desktop) */}
        <div className="absolute right-4 hidden lg:block" ref={profileRef}>
          <div
            className="relative cursor-pointer flex items-center gap-2"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="h-[40px] w-[40px] rounded-full hover:scale-105 transition-transform duration-300 border-2 border-amber-500 shadow-md"
              />
            ) : (
              <FaUserCircle className="text-3xl text-amber-700 hover:text-amber-900 transition-colors duration-300" />
            )}
            <p className="text-amber-800 font-semibold">{user ? user.firstName : "Guest"}</p>
          </div>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              {user ? (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-black font-semibold">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-4 text-red-600 hover:bg-gray-100 rounded-b-lg transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block p-4 text-black hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
