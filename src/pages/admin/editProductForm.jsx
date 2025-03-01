import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function EditProductForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state.product;
    const altNames = product.altNames.join(",");

    if (product == null) {
        navigate("/admin/products");
    }

    const [productId, setProductId] = useState(product.productId);
    const [productName, setProductName] = useState(product.productName);
    const [alternativeNames, setAlternativeNames] = useState(altNames);
    const [imageFiles, setImageFiles] = useState([]);
    const [price, setPrice] = useState(product.price);
    const [lastPrice, setLastPrice] = useState(product.lastPrice);
    const [stock, setStock] = useState(product.stock);
    const [description, setDescription] = useState(product.description);

    async function handleSubmit() {
        const altNames = alternativeNames.split(",");

        const promisesArray = [];
        let imgUrls = product.images;

        if (imageFiles.length > 0) {
            for (let i = 0; i < imageFiles.length; i++) {
                promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
            }
            imgUrls = await Promise.all(promisesArray);
        }

        const productData = {
            productId: productId,
            productName: productName,
            altNames: altNames,
            images: imgUrls,
            price: price,
            lastPrice: lastPrice,
            stock: stock,
            description: description,
        };

        const token = localStorage.getItem("token");

        try {
            await axios.put(
                import.meta.env.VITE_BACKEND_URL + "/api/products/" + product.productId,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate("/admin/products");
            toast.success("Product Updated Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update product");
        }
    }

    return (
        <div className="min-h-screen bg-Background flex items-center justify-center p-4">
            <div className="bg-SecondaryBackground w-full max-w-md p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-Text text-center mb-6">
                    Edit Product Form
                </h1>
                <div className="space-y-4">
                    {/* Product ID Input */}
                    <div className="flex flex-col">
                        <label className="text-Text font-medium">Product ID</label>
                        <input
                            disabled
                            type="text"
                            className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
                            placeholder="Enter Product ID"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                    </div>

                    {/* Product Name Input */}
                    <div className="flex flex-col">
                        <label className="text-Text font-medium">Product Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
                            placeholder="Enter Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    {/* Alternative Names Input */}
                    <div className="flex flex-col">
                        <label className="text-Text font-medium">Alternative Names</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
                            placeholder="Enter Alternative Names (comma-separated)"
                            value={alternativeNames}
                            onChange={(e) => setAlternativeNames(e.target.value)}
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

                    {/* Price Input */}
                    <div className="flex flex-col">
                        <label className="text-Text font-medium">Price</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {/* Last Price Input */}
                    <div className="flex flex-col">
                        <label className="text-Text font-medium">Last Price</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
                            placeholder="Enter Last Price"
                            value={lastPrice}
                            onChange={(e) => setLastPrice(e.target.value)}
                        />
                    </div>

                    {/* Stock Input */}
                    <div className="flex flex-col">
                        <label className="text-Text font-medium">Stock</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
                            placeholder="Enter Stock Quantity"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>

                    {/* Description Textarea */}
                    <div className="flex flex-col">
                        <label className="text-Text font-medium">Description</label>
                        <textarea
                            className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
                            placeholder="Enter Product Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-PrimaryGold text-Text font-medium rounded-md hover:bg-SecondaryGold hover:text-white transition-colors duration-200 focus:ring focus:ring-PrimaryGold focus:outline-none"
                        onClick={handleSubmit}
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
}