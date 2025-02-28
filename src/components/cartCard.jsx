import axios from "axios";
import { useEffect, useState } from "react";
import { deleteItem } from "../utils/cartFunction";

export default function CartCard(props) {
  const productId = props.productId;
  const qty = props.qty;

  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
        .then((response) => {
          if (response.data != null) {
            setProduct(response.data);
            setLoaded(true);
          } else {
            deleteItem(productId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loaded, productId]);

  return (
    <>
      {!loaded ? (
        <tr>
          <td colSpan="6" className="text-center">
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-PrimaryGold"></div>
            </div>
          </td>
        </tr>
      ) : (
        <tr className="hover:bg-SecondaryBackground transition-all duration-300">
          <td className="p-2">
            <img
              src={product?.images[0]}
              alt={product?.productName}
              className="w-[90px] h-[90px] object-cover mx-auto rounded-lg"
            />
          </td>
          <td className="p-2 text-center text-Text">{product?.productName}</td>
          <td className="p-2 text-center text-Text">{productId}</td>
          <td className="p-2 text-center text-Text">{qty}</td>
          <td className="p-2 text-center text-Text">
            LKR. {product?.lastPrice.toFixed(2)}
          </td>
          <td className="p-2 text-center text-Text">
            LKR. {(product?.lastPrice * qty).toFixed(2)}
          </td>
        </tr>
      )}
    </>
  );
}