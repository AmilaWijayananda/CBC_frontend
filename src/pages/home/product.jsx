import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import { FaSearch } from "react-icons/fa";
import Footer from "../../components/footer";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (loadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }, []);

  function search(e) {
    const query = e.target.value;
    setQuery(query);
    setLoadingStatus("loading");
    if (query == "") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query)
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }

  return (
    <div className="w-full h-full pt-4 flex flex-col bg-Background">
      <div className="w-full flex justify-center">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            className="w-full p-2 pl-10 rounded-lg border-2 border-PrimaryGold focus:outline-none focus:border-SecondaryGold"
            placeholder="Search Products"
            onChange={search}
            value={query}
          />
          <FaSearch className="absolute left-3 top-3 text-PrimaryGold" />
        </div>
      </div>
      {loadingStatus == "loaded" && (
        <div className="w-full h-full  overflow-y-scroll flex flex-wrap justify-center pt-4 relative">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
          
          {/* Footer Section */}
          <div className="w-full h-[40%] bg-Background border-t-2 border-PrimaryGold shadow-lg">
            <Footer/>
          </div>
        </div>
      )}
      {loadingStatus == "loading" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32  border-2 border-gray-500 border-b-accent border-b-4"></div>
        </div>
      )}
    </div>
  );
}
