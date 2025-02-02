import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function AdminProductsPage() {

    //getProducts();
    const [products, setProducts] = useState([]);

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