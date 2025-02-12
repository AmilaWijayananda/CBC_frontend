import { Link, Route, Routes } from "react-router-dom";
import { FaChartBar, FaUsers, FaBox, FaShoppingCart } from "react-icons/fa";
import AdminProductsPage from "./adminProductsPage";
import AddProductForm from "./addProductForm";
import EditProductForm from "./editProductForm";
import AdminOrdersPage from "./adminOrderPage";

export default function AdminHomePage() {
  return (
    <div className="bg-blue-200 w-full h-screen flex">
      {/* Sidebar */}
      <div className="bg-blue-500 w-[20%] h-screen flex flex-col items-center py-6">
        <h1 className="text-white text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col gap-4 w-full">
          <Link
            className="flex items-center gap-3 px-4 py-2 text-white text-lg hover:bg-blue-600 w-full"
            to="/admin/dashboard"
          >
            <FaChartBar />
            Dashboard
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2 text-white text-lg hover:bg-blue-600 w-full"
            to="/admin/customers"
          >
            <FaUsers />
            Customers
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2 text-white text-lg hover:bg-blue-600 w-full"
            to="/admin/products"
          >
            <FaBox />
            Products
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2 text-white text-lg hover:bg-blue-600 w-full"
            to="/admin/orders"
          >
            <FaShoppingCart />
            Orders
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="bg-blue-200 w-[80%] h-screen p-6">
        
        <Routes path="/*">
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/customers" element={<h1>Customers</h1>} />
          <Route path="/products" element={<AdminProductsPage />} />
          <Route path="/products/addProduct" element={<AddProductForm/>} />
          <Route path="/products/editProduct" element={<EditProductForm/>} />
          <Route path="/orders" element={<AdminOrdersPage />} />
        </Routes>

      </div>
    </div>
  );
}
