import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import NavSlider from "./navSlider";
import axios from "axios";
import { useEffect } from "react";

export default function Header() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user data on component mount
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user); // Access the `user` object from `res.data`
        console.log(res.data.user); // Log the user data to verify
      })
      .catch((err) => {
        toast.error("Failed to fetch user data. Please try again.");
      });
  }, []);




  // Handle logout
  const handleLogout = () => {
    // Clear user session or token
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <>
      {isSliderOpen && <NavSlider closeSlider={() => setIsSliderOpen(false)} />}
      <header className="bg-SecondaryBackground w-full h-[100px] relative flex justify-center items-center shadow-lg">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Logo"
          className="cursor-pointer h-[80px] w-[80px] rounded-full absolute left-4 hover:scale-105 transition-transform duration-300"
        />

        {/* Hamburger Menu (Mobile) */}
        <RxHamburgerMenu
          onClick={() => setIsSliderOpen(true)}
          className="text-3xl absolute cursor-pointer text-Accent right-4 lg:hidden hover:text-PrimaryGold transition-colors duration-300"
        />

        {/* Navigation Links (Desktop) */}
        <div className="h-full flex items-center w-[500px] justify-evenly hidden lg:flex">
          <Link
            to="/"
            className="text-Text text-2xl font-bold hover:text-PrimaryGold hover:border-b-2 border-PrimaryGold transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-Text text-2xl font-bold hover:text-PrimaryGold hover:border-b-2 border-PrimaryGold transition-all duration-300"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-Text text-2xl font-bold hover:text-PrimaryGold hover:border-b-2 border-PrimaryGold transition-all duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-Text text-2xl font-bold hover:text-PrimaryGold hover:border-b-2 border-PrimaryGold transition-all duration-300"
          >
            Contact Us
          </Link>
          <Link
            to="/cart"
            className="text-Text text-2xl font-bold hover:text-PrimaryGold hover:border-b-2 border-PrimaryGold transition-all duration-300"
          >
            Cart
          </Link>
          <Link
            to="/review"
            className="text-Text text-2xl font-bold hover:text-PrimaryGold hover:border-b-2 border-PrimaryGold transition-all duration-300"
          >
            Reviews
          </Link>
        </div>

        {/* User Profile Section */}
<div className="absolute right-4 hidden lg:block">
  <div
    className="relative cursor-pointer"
    onClick={() => setIsProfileOpen(!isProfileOpen)}
  >
    {user ? (
      <img
        src={user.profilePicture}
        alt="Profile"
        className="h-[40px] w-[40px] rounded-full hover:scale-105 transition-transform duration-300"
      />
    ) : (
      <FaUserCircle className="text-3xl text-Accent hover:text-PrimaryGold transition-colors duration-300" />
    )}
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