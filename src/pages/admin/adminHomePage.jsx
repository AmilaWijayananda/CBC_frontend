import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import AdminProductsPage from "./adminProductsPage";
import AddProductForm from "./addProductForm";
import EditProductForm from "./editProductForm";
import AdminOrdersPage from "./adminOrderPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoImagesSharp } from "react-icons/io5";
import AdminBannerPage from "./adminBannerPage";
import AddBannerForm from "./addBannerForm";
import EditBannerForm from "./editBannerForm";
import { TbStarHalfFilled } from "react-icons/tb";
import ManageReviewForm from "./mangeReviewForm";
import { VscNote } from "react-icons/vsc";
import ManageNoteForm from "./manageNoteForm";
import { fetchProfile } from "../../utils/fetchProfile";

export default function AdminHomePage() {
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile data
  useEffect(() => {
    const loadProfile = async () => {
      const profile = await fetchProfile();
      if (profile) {
        setUser(profile);
      } else {
        toast.error("Failed to load profile");
        navigate("/login");
      }
    };
    loadProfile();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-Background w-full h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Sidebar */}
      <div className="bg-PrimaryGold w-full md:w-[20%] h-auto md:h-screen flex flex-col items-center py-6 relative">
        <h1 className="text-Text text-2xl font-bold mb-6 hidden md:block">
          Admin Panel
        </h1>
        <nav className="flex flex-row md:flex-col gap-2 w-full justify-around md:justify-start px-2 md:px-0 overflow-x-auto">
          <Link
            className="flex items-center gap-2 px-2 py-2 text-Text text-sm hover:bg-SecondaryGold hover:text-white transition-colors duration-200"
            to="/admin/"
          >
            <FaChartBar />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link
            className="flex items-center gap-2 px-2 py-2 text-Text text-sm hover:bg-SecondaryGold hover:text-white transition-colors duration-200"
            to="/admin/products"
          >
            <FaBox />
            <span className="hidden md:inline">Products</span>
          </Link>
          <Link
            className="flex items-center gap-2 px-2 py-2 text-Text text-sm hover:bg-SecondaryGold hover:text-white transition-colors duration-200"
            to="/admin/orders"
          >
            <FaShoppingCart />
            <span className="hidden md:inline">Orders</span>
          </Link>
          <Link
            className="flex items-center gap-2 px-2 py-2 text-Text text-sm hover:bg-SecondaryGold hover:text-white transition-colors duration-200"
            to="/admin/customers"
          >
            <FaUsers />
            <span className="hidden md:inline">Customers</span>
          </Link>
          <Link
            className="flex items-center gap-2 px-2 py-2 text-Text text-sm hover:bg-SecondaryGold hover:text-white transition-colors duration-200"
            to="/admin/reviews"
          >
            <TbStarHalfFilled />
            <span className="hidden md:inline">Reviews</span>
          </Link>
          <Link
            className="flex items-center gap-2 px-2 py-2 text-Text text-sm hover:bg-SecondaryGold hover:text-white transition-colors duration-200"
            to="/admin/banner"
          >
            <IoImagesSharp />
            <span className="hidden md:inline">Banners</span>
          </Link>
          <Link
            className="flex items-center gap-2 px-2 py-2 text-Text text-sm hover:bg-SecondaryGold hover:text-white transition-colors duration-200"
            to="/admin/notes"
          >
            <VscNote />
            <span className="hidden md:inline">Page's Notes</span>
          </Link>

          {/* Profile Button - Mobile & Desktop */}
          <div
            className="relative flex items-center gap-2 px-2 py-2 text-Text text-sm hover:bg-SecondaryGold hover:text-white transition-colors duration-200 cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <FaUserCircle className="text-lg" />
            <span className="hidden md:inline">Profile</span>
          </div>
        </nav>

        {/* Profile Dropdown - Mobile (Fixed), Desktop (Below Profile Button) */}
        {isProfileOpen && (
          <div className="md:absolute md:top-full md:right-0 md:w-48 fixed top-14 right-4 w-48 bg-white rounded-lg shadow-lg z-50">
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

      {/* Main Content */}
      <div className="bg-SecondaryBackground w-full md:w-[80%] h-screen p-6 overflow-y-auto">
        {user != null ? (
          <Routes path="/*">
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="/customers" element={<h1>Customers</h1>} />
            <Route path="/products" element={<AdminProductsPage />} />
            <Route path="/products/addProduct" element={<AddProductForm />} />
            <Route path="/products/editProduct" element={<EditProductForm />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/banner" element={<AdminBannerPage />} />
            <Route path="/banner/addBanner" element={<AddBannerForm />} />
            <Route path="/banner/editBanner" element={<EditBannerForm />} />
            <Route path="/reviews" element={<ManageReviewForm />} />
            <Route path="/notes" element={<ManageNoteForm />} />
          </Routes>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-Accent"></div>
          </div>
        )}
      </div>
    </div>
  );
}
