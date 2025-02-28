import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function AddBannerForm() {

    const [bannerId, setBannerId] = useState("");
    const [bannerName, setBannerName] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const navigate = useNavigate()
    

    async function handleSubmit(){

        const promisesArray = []

        for(let i=0; i<imageFiles.length; i++){
          promisesArray[i] = uploadMediaToSupabase(imageFiles[i])
        }
        
        const imgUrls = await Promise.all(promisesArray)
        

        const banner = {
            bannerId : bannerId,
            bannerName : bannerName,
            images : imgUrls,
          }

          //console.log("Final Product Object Before Sending:", product); // Debugging log

          const token = localStorage.getItem("token")

          try {
            await axios.post(import.meta.env.VITE_BACKEND_URL +"/api/banner",banner, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            navigate("/admin/banner")
            toast.success("Banner Added Successfully")
          } catch (error) {
            console.log(error)
            toast.error('Failed to add banner')
          }
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add Banner
        </h1>
        <div className="space-y-4" >
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Banner ID</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Product ID"
              value={bannerId}
              onChange={(e) => setBannerId(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Banner Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Banner Name"
              value={bannerName}
              onChange={(e) => setBannerName(e.target.value)}
            />
          </div>


          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Image URLs</label>
            <input
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Image URLs (comma-separated)"
              onChange={(e) => {
                setImageFiles(e.target.files)
              }}
              multiple
            />
          </div>

          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
            onClick={handleSubmit}
          >
            Add Banner
          </button>
          
        </div>
      </div>
    </div>
    )
}