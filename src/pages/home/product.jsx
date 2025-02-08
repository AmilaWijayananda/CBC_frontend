import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState('loading');
    useEffect(
        ()=>{
            if(loadingStatus=='loading'){
                axios.get('http://localhost:5000/api/products').then((res)=>{
                    console.log(res.data)
                    setProducts(res.data)
                    setLoadingStatus('loaded')
                }).catch(
                    (err)=>toast.error("Failed to fetch products from server")
                )
            }
            
        }
    ,[])
    return (
      <div>
        <h1>Product Page</h1>
      </div>
    );
}