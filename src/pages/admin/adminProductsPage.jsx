import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    if (!productsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setProductsLoaded(true);
        });
    }
  }, [productsLoaded]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-Background p-6 relative">
      {/* Add Product Button */}
      <Link
        to={"/admin/products/addProduct"}
        className="absolute right-[25px] bottom-[25px] text-[25px] border-Accent border-[2px] text-Accent p-5 rounded-xl hover:bg-Accent hover:text-white transition-colors duration-200"
      >
        <FaPlus />
      </Link>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto bg-SecondaryBackground rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-Text mb-6">
          Admin Products Page
        </h1>
        {productsLoaded ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-PrimaryGold">
                  <th className="text-left px-6 py-4 border-b text-Text font-medium">
                    Product ID
                  </th>
                  <th className="text-left px-6 py-4 border-b text-Text font-medium">
                    Product Name
                  </th>
                  <th className="text-left px-6 py-4 border-b text-Text font-medium">
                    Price
                  </th>
                  <th className="text-left px-6 py-4 border-b text-Text font-medium">
                    Last Price
                  </th>
                  <th className="text-left px-6 py-4 border-b text-Text font-medium">
                    Stock
                  </th>
                  <th className="text-left px-6 py-4 border-b text-Text font-medium">
                    Description
                  </th>
                  <th className="text-center px-6 py-4 border-b text-Text font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-SecondaryBackground ${
                      index % 2 === 0 ? "bg-SecondaryBackground" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 border-b text-Text">
                      {product.productId}
                    </td>
                    <td className="px-6 py-4 border-b text-Text">
                      {product.productName}
                    </td>
                    <td className="px-6 py-4 border-b text-Text">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 border-b text-Text">
                      ${product.lastPrice}
                    </td>
                    <td className="px-6 py-4 border-b text-Text">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 border-b text-Text truncate max-w-xs">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 border-b text-Text text-center">
                      <button
                        className="text-red-500 hover:text-red-700 mr-2 transition-colors duration-200"
                        title="Delete"
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          axios
                            .delete(
                              import.meta.env.VITE_BACKEND_URL +
                                `/api/products/${product.productId}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            )
                            .then((res) => {
                              console.log(res.data);
                              toast.success("Product deleted successfully");
                              setProductsLoaded(false);
                            });
                        }}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="text-Accent hover:text-PrimaryGold transition-colors duration-200"
                        title="Edit"
                        onClick={() => {
                          navigate("/admin/products/editProduct", {
                            state: { product: product },
                          });
                        }}
                      >
                        <FaPencil />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[60px] h-[60px] border-[4px] border-gray-200 border-b-Accent animate-spin rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}