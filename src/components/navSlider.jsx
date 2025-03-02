import { IoMdClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavSlider({ closeSlider, user, handleLogout }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden">
      <div className="bg-Background flex flex-col w-[400px] h-screen slide-up shadow-lg relative">
        
        {/* Header Section */}
        <div className="bg-SecondaryBackground w-full h-[100px] relative flex justify-center items-center">
          <img
            src="/logo.png"
            className="cursor-pointer h-[80px] rounded-full absolute left-4"
            alt="Logo"
          />
          <IoMdClose
            onClick={closeSlider}
            className="text-3xl absolute cursor-pointer text-Accent right-4 lg:hidden"
            aria-label="Close navigation menu"
          />
        </div>

        {/* Navigation Links */}
        {[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Cart", path: "/cart" },
          { name: "My Orders", path: "/orders" },
          { name: "About Us", path: "/about" },
          { name: "Contact Us", path: "/contact" },
          { name: "Reviews", path: "/review" },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={closeSlider}
            className="text-Text font-bold text-xl p-4 hover:bg-SecondaryGold hover:text-white transition-colors duration-300"
          >
            {item.name}
          </Link>
        ))}

        {/* User Profile Section */}
        <div className="mt-auto p-4 border-t border-gray-200 relative">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="h-[40px] w-[40px] rounded-full hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <FaUserCircle className="text-3xl text-Accent hover:text-PrimaryGold transition-colors duration-300" />
            )}
            <p className="text-Text font-semibold">{user ? user.firstName : "Guest"}</p>
          </div>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
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
                      closeSlider();
                    }}
                    className="w-full text-left p-4 text-red-600 hover:bg-gray-100 rounded-b-lg transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeSlider}
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
