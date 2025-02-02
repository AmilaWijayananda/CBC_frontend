import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function AdminProductsPage() {

    //getProducts();
    const [products, setProducts] = useState([
        {
            "_id": "6785e6c5cd79ba843d49d07b",
            "productID": "BP001234",
            "ProductName": "Luxury Hydrating Face Cream",
            "altName": [
                "Moisturizing Cream",
                "Face Hydration Gel",
                "Daily Glow Cream"
            ],
            "images": [
                "https://example.com/images/face-cream-front.jpg",
                "https://example.com/images/face-cream-back.jpg",
                "https://example.com/images/face-cream-usage.jpg"
            ],
            "price": 29.99,
            "lastPrice": 34.99,
            "stock": 150,
            "description": "A deeply hydrating face cream infused with natural extracts to leave your skin glowing and soft. Perfect for daily use on all skin types.",
            "__v": 0
        },
        {
            "_id": "678b442370396d24e842ed36",
            "productID": "BP001235",
            "ProductName": "Luxury Hydrating Foot Cream",
            "altName": [
                "Moisturizing Cream",
                "Face Hydration Gel",
                "Daily Glow Cream"
            ],
            "images": [
                "https://example.com/images/face-cream-front.jpg",
                "https://example.com/images/face-cream-back.jpg",
                "https://example.com/images/face-cream-usage.jpg"
            ],
            "price": 29.99,
            "lastPrice": 34.99,
            "stock": 150,
            "description": "A deeply hydrating face cream infused with natural extracts to leave your skin glowing and soft. Perfect for daily use on all skin types.",
            "__v": 0
        },
        {
            "_id": "678b445670396d24e842ed38",
            "productID": "BP001236",
            "ProductName": "Luxury Hydrating Lips Cream",
            "altName": [
                "Moisturizing Cream",
                "Face Hydration Gel",
                "Daily Glow Cream"
            ],
            "images": [
                "https://example.com/images/face-cream-front.jpg",
                "https://example.com/images/face-cream-back.jpg",
                "https://example.com/images/face-cream-usage.jpg"
            ],
            "price": 29.99,
            "lastPrice": 34.99,
            "stock": 150,
            "description": "A deeply hydrating face cream infused with natural extracts to leave your skin glowing and soft. Perfect for daily use on all skin types.",
            "__v": 0
        }
    ]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products').then
        ((res)=>{
            console.log(res.data);
            setProducts(res.data);
        })
    }, [])



    console.log(products);

    // return (
    //     <div>
    //         <h1>Admin Products Page</h1>
    //         {
    //             products.map(
    //                 (product,index) => {
    //                     return (
    //                         <div key={index}>
    //                             {product.ProductName}
    //                         </div>
    //                     )
    //                 }
    //             )
    //         }
    //     </div>
    // );


    return (
        <div>
            <h1>Admin Products Page</h1>
            <table>
                <thead>
                    
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Description</th>
                    <th>Actions</th>
                    
                </thead>
                
                <tbody>
                {
                 products.map(
                    (product,index) => {
                         return (
                            <tr key={index}>
                                <td>{product.productID}</td>
                                <td>{product.ProductName}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td>{product.description}</td>
                                <td>
                                    <FaTrash />
                                    <FaPencil/>
                                </td>
                            </tr>
                            )
                        }
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

// async function getProducts() {
//     const res = await axios.get('http://localhost:5000/api/products');
//     console.log(res.data);
// }