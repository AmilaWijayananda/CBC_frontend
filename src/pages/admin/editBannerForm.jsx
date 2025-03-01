import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function EditBannerForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const banner = location.state.banner;

    if (banner == null) {
        navigate("/admin/banner");
    }

    const [bannerId, setBannerId] = useState(banner.bannerId);
    const [bannerName, setBannerName] = useState(banner.bannerName);
    const [imageFiles, setImageFiles] = useState([]);

    async function handleSubmit() {
        const promisesArray = [];
        let imgUrls = banner.images;

        if (imageFiles.length > 0) {
            for (let i = 0; i < imageFiles.length; i++) {
                promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
            }
            imgUrls = await Promise.all(promisesArray);
        }

        const bannerData = {
            bannerId: bannerId,
            bannerName: bannerName,
            images: imgUrls,
        };

        const token = localStorage.getItem("token");

        try {
            await axios.put(
                import.meta.env.VITE_BACKEND_URL + "/api/banner/" + banner.bannerId,
                bannerData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate("/admin/banner");
            toast.success("Banner Updated Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update banner");
        }
    }

    return (
        <div className="min-h-screen bg-Background flex items-center justify-center p-4">
            <div className="bg-SecondaryBackground w-full max-w-md p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-Text text-center mb-6">
                    Edit Banner Form
                </h1>
                <div className="space-y-4">
                    {/* Banner ID Input */}
                    <div className="flex flex-col">
                        <label className="text-Text font-medium">Banner ID</label>
                        <input
                            disabled
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
                        Update Banner
                    </button>
                </div>
            </div>
        </div>
    );
}