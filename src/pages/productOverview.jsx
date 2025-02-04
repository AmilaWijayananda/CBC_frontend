import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";

export default function ProductOverview() {

    const params = useParams();
    const productId = params.id;
    const [product, setProduct] = useState(null)
    const [status , setStatus] = useState("loading")

    useEffect(() => {
        console.log(productId);
        axios.get("http://localhost:5000/api/products/"+productId)
        .then((res) => {
            console.log(res.data);

            //if null
            if(res.data == null){
                setStatus("not found");
        }
            if (res.data != null) {
                setProduct(res.data);
                setStatus("found");
            }
            });
    }, []);

    return (
        <div className="w-full h-[calc(100vh-100px)]">
            {
                status == "loading"&&(
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                    </div>
                )
            }
            {
                status == "not found"&&(
                    <ProductNotFound />
                )
            }
            {
                status == "found"&&(
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-[35%] h-[300px]">
                            <img src={product.images[0]} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-[65%] h-full flex flex-col items-center">
                            <h1 className="text-3xl font-bold">{product.productName}</h1>
                            <p className="text-xl">{product.description}</p>
                            <div className="flex items-center gap-2">
                                <p className="text-2xl font-bold">${product.lastPrice}</p>
                                <p className="text-xl line-through">${product.price}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}