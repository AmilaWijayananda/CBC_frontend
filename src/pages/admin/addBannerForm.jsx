import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function AddBannerForm() {
  const [bannerId, setBannerId] = useState("");
  const [bannerName, setBannerName] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit() {
    const promisesArray = [];

    for (let i = 0; i < imageFiles.length; i++) {
      promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
    }

    const imgUrls = await Promise.all(promisesArray);

    const banner = {
      bannerId: bannerId,
      bannerName: bannerName,
      images: imgUrls,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/banner", banner, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/banner");
      toast.success("Banner Added Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add banner");
    }
  }

  return (
    <div className="min-h-screen bg-Background flex items-center justify-center p-4">
      <div className="bg-SecondaryBackground w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-Text text-center mb-6">
          Add Banner
        </h1>
        <div className="space-y-4">
          {/* Banner ID Input */}
          <div className="flex flex-col">
            <label className="text-Text font-medium">Banner ID</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
              placeholder="Enter Banner ID"
              value={bannerId}
              onChange={(e) => setBannerId(e.target.value)}
            />
          </div>

          {/* Banner Name Input */}
          <div className="flex flex-col">
            <label className="text-Text font-medium">Banner Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
              placeholder="Enter Banner Name"
              value={bannerName}
              onChange={(e) => setBannerName(e.target.value)}
            />
          </div>

          {/* Image Upload Input */}
          <div className="flex flex-col">
            <label className="text-Text font-medium">Upload Images</label>
            <input
              type="file"
              className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
              onChange={(e) => {
                setImageFiles(e.target.files);
              }}
              multiple
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-PrimaryGold text-Text font-medium rounded-md hover:bg-SecondaryGold hover:text-white transition-colors duration-200 focus:ring focus:ring-PrimaryGold focus:outline-none"
            onClick={handleSubmit}
          >
            Add Banner
          </button>
        </div>
      </div>
    </div>
  );
}