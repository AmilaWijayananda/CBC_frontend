import { useState } from "react";
import { Link } from "react-router-dom";

export default function FinalTestNavSlider({ closeSlider, user, handleLogout }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden">
      <div className="bg-[#FDF4E3] flex flex-col w-[400px] h-screen shadow-lg relative">
        
        {/* Header Section */}
        <div className="bg-[#E7C27F] w-full h-[100px] flex justify-center items-center relative">
          <img
            src="/logo.png"
            className="cursor-pointer h-[80px] rounded-full absolute left-4"
            alt="Logo"
          />
          <button onClick={closeSlider} className="text-3xl absolute right-4 text-black">
            ✖️
          </button>
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
            className="text-[#65451F] font-bold text-xl p-4 hover:bg-[#D4A76A] hover:text-white transition-colors duration-300"
          >
            {item.name}
          </Link>
        ))}

        {/* User Profile Section */}
        <div className="mt-auto p-4 border-t border-gray-200">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            {user ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="h-[40px] w-[40px] rounded-full border-2 border-[#65451F] shadow-md"
              />
            ) : (
              <span className="text-3xl text-[#65451F]">👤</span>
            )}
            <p className="text-[#65451F] font-semibold">
              {user ? `${user.firstName} ${user.lastName}` : "Guest"}
            </p>
          </div>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute bottom-16 left-4 w-48 bg-white rounded-lg shadow-lg p-2">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    closeSlider();
                  }}
                  className="w-full text-left p-2 text-red-600 hover:bg-gray-100 rounded transition duration-300"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeSlider}
                  className="block p-2 text-black hover:bg-gray-100 rounded transition duration-300"
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
