import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaChartBar, FaUsers, FaBox, FaShoppingCart } from "react-icons/fa";
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

export default function AdminHomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.type != "admin") {
          toast.error("Unauthorized access");
          navigate("/login");
        } else {
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch user data");
        navigate("/login");
      });
  }, []);

  return (
    <div className="bg-Background w-full h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-PrimaryGold w-full md:w-[20%] h-auto md:h-screen flex flex-col items-center py-6">
        <h1 className="text-Text text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col gap-4 w-full">
          <Link
            className="flex items-center gap-3 px-4 py-2 text-Text text-lg hover:bg-SecondaryGold hover:text-white transition-colors duration-200 w-full"
            to="/admin/"
          >
            <FaChartBar />
            Dashboard
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2 text-Text text-lg hover:bg-SecondaryGold hover:text-white transition-colors duration-200 w-full"
            to="/admin/products"
          >
            <FaBox />
            Products
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2 text-Text text-lg hover:bg-SecondaryGold hover:text-white transition-colors duration-200 w-full"
            to="/admin/orders"
          >
            <FaShoppingCart />
            Orders
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2 text-Text text-lg hover:bg-SecondaryGold hover:text-white transition-colors duration-200 w-full"
            to="/admin/customers"
          >
            <FaUsers />
            Customers
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2 text-Text text-lg hover:bg-SecondaryGold hover:text-white transition-colors duration-200 w-full"
            to="/admin/reviews"
          >
            <TbStarHalfFilled />
            Reviews
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2 text-Text text-lg hover:bg-SecondaryGold hover:text-white transition-colors duration-200 w-full"
            to="/admin/banner"
          >
            <IoImagesSharp />
            Banners
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2 text-Text text-lg hover:bg-SecondaryGold hover:text-white transition-colors duration-200 w-full"
            to="/admin/notes"
          >
            <VscNote />
            Page's Notes
          </Link>
        </nav>
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