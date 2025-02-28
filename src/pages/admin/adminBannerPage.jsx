import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AdminBannerPage() {

    
    const [banner, setBanner] = useState([]);
    const [bannerLoaded, setBannerLoaded] = useState(false);

    useEffect(() => {
        if(!bannerLoaded){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/banner").then
            ((res)=>{
            console.log(res.data);
            setBanner(res.data);
            setBannerLoaded(true);
        })
    }
    }, [bannerLoaded])

    const navigate = useNavigate();



    return (
        <div className="min-h-screen bg-gray-100 p-6 relative">

      <Link to={"/admin/banner/addBanner"} className="absolute right-[25px] bottom-[25px] text-[25px]  border-[#3b82f6] border-[2px] text-[#3b82f6] p-5 rounded-xl hover:rounded-full"><FaPlus /></Link>



      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Banner Page
        </h1>
        {
          bannerLoaded?<div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-6 py-4 border-b text-gray-700 font-medium">
                  Banner ID
                </th>
                <th className="text-left px-6 py-4 border-b text-gray-700 font-medium">
                  Banner Name
                </th>
                <th className="text-center px-6 py-4 border-b text-gray-700 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {banner.map((banner, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 border-b text-gray-600">
                    {banner.bannerId}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-600">
                    {banner.bannerName}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-600 text-center">
                    <button
                      className="text-red-500 hover:text-red-700 mr-2"
                      title="Delete"

                      onClick={()=>{
                        const token = localStorage.getItem("token");

                        axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/banner/${banner.bannerId}`, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }).then((res) => {
                          console.log(res.data);
                          toast.success("Banner deleted successfully");
                          setBannerLoaded(false);
                        });
                  
                      }}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                      onClick={()=>{
                        navigate("/admin/banner/editBanner" , {state : {banner : banner}});
                      }}
                    >
                      <FaPencil />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>:<div className="w-full h-full flex justify-center items-center">
          <div className="w-[60px] h-[60px] border-[4px] border-gray-200 border-b-[#3b82f6] animate-spin rounded-full"></div>
        </div>
  
        }
        
        
      </div>
    </div>
  );
}

