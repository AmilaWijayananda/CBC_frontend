import { IoMdClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavSlider(props) {
  const { closeSlider, user, handleLogout } = props;
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="fixed w-screen h-screen bg-[#00000080] z-30 lg:hidden">
      <div className="bg-Background flex flex-col w-[400px] h-screen slide-up">
        {/* Header Section */}
        <div className="bg-SecondaryBackground w-full h-[100px] relative flex justify-center items-center">
          <img
            src="/logo.png"
            className="cursor-pointer h-full rounded-full absolute left-[10px]"
            alt="Logo"
          />
          <IoMdClose
            onClick={closeSlider}
            className="text-3xl absolute cursor-pointer text-Accent right-[10px] lg:hidden"
          />
        </div>

        {/* Navigation Links */}
        <Link
          to="/"
          onClick={closeSlider} // Close slider on click
          className="text-Text font-bold text-xl p-4 hover:bg-SecondaryGold hover:text-white transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/products"
          onClick={closeSlider} // Close slider on click
          className="text-Text font-bold text-xl p-4 hover:bg-SecondaryGold hover:text-white transition-colors duration-300"
        >
          Products
        </Link>
        <Link
          to="/about"
          onClick={closeSlider} // Close slider on click
          className="text-Text font-bold text-xl p-4 hover:bg-SecondaryGold hover:text-white transition-colors duration-300"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          onClick={closeSlider} // Close slider on click
          className="text-Text font-bold text-xl p-4 hover:bg-SecondaryGold hover:text-white transition-colors duration-300"
        >
          Contact Us
        </Link>
        <Link
          to="/cart"
          onClick={closeSlider} // Close slider on click
          className="text-Text font-bold text-xl p-4 hover:bg-SecondaryGold hover:text-white transition-colors duration-300"
        >
          Cart
        </Link>
        <Link
          to="/review"
          onClick={closeSlider} // Close slider on click
          className="text-Text font-bold text-xl p-4 hover:bg-SecondaryGold hover:text-white transition-colors duration-300"
        >
          Reviews
        </Link>

        {/* User Profile Section */}
        <div className="mt-auto p-4 border-t border-gray-200">
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
            <div className="absolute bottom-20 left-4 w-48 bg-white rounded-lg shadow-lg z-50">
              {user ? (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-black font-semibold">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeSlider(); // Close slider on logout
                    }}
                    className="w-full text-left p-4 text-red-600 hover:bg-gray-100 rounded-b-lg transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeSlider} // Close slider on click
                  className="block p-4 text-black hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}