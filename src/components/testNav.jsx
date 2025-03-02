import { useState } from "react";

export default function TestNavSlider({ closeSlider }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-red-500 bg-opacity-90 z-30 lg:hidden">
      <div className="bg-white flex flex-col w-[300px] h-screen shadow-lg relative p-4">
        
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-bold">Test Nav</span>
          <button onClick={closeSlider} className="text-2xl">
            ❌
          </button>
        </div>

        {/* Navigation Links */}
        {["Home", "Products", "Cart", "Orders", "About", "Contact", "Reviews"].map((item) => (
          <button
            key={item}
            onClick={closeSlider}
            className="text-black font-bold text-lg p-3 hover:bg-red-700 hover:text-white transition-colors duration-300 text-left w-full"
          >
            {item}
          </button>
        ))}

        {/* User Profile Section */}
        <div className="mt-auto p-4 border-t">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <span className="text-2xl">👤</span>
            <p className="text-black font-semibold">Guest</p>
          </div>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute bottom-16 left-4 w-48 bg-white rounded-lg shadow-lg p-2">
              <button
                onClick={closeSlider}
                className="w-full text-left p-2 text-red-600 hover:bg-gray-100 rounded transition duration-300"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
