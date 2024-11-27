import { useEffect, useState } from "react";
import "./SingleProductPage.scss";
import { getProductById } from "../../../utils/apiUtils.mjs";
import { useNavigate, useParams } from "react-router-dom";

export default function SingleProductPage() {
  const [product, setProduct] = useState(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const { product_id } = useParams();
  const navigate = useNavigate();

  const productRender = async () => {
    try {
      const selectedProduct = await getProductById(product_id);
      setProduct(selectedProduct);
      return;
    } catch (error) {}
  };

  const handleBtMinus = (event) => {
    event.preventDefault();

    if (purchaseQuantity === 0) {
      return;
    } else {
      return setPurchaseQuantity(purchaseQuantity - 1);
    }
  };

  const handleBtPlus = (event) => {
    event.preventDefault();
    return setPurchaseQuantity(purchaseQuantity + 1);
  };

  console.log("window.scrollY = ");
  console.log(window.scrollY);

  useEffect(() => {
    productRender();
  }, []);
  return (
    <>
      <button
        onClick={() => {
          navigate(-1, { state: { scrollPosition: window.scrollY } });
        }}
      >
        ←
      </button>
      {product ? (
        <>
          <h3>{product.product_name}</h3>
          <p>£{product.price_gbp}</p>
          <p>{product.description}</p>
        </>
      ) : (
        <p>loading...</p>
      )}

      <form action="">
        <textarea
          rows="5"
          cols="33"
          placeholder="type in special request..."
        ></textarea>
        <div className="product-page__bt-box">
          <button onClick={handleBtMinus}> - </button>
          <p>{purchaseQuantity}</p>
          <button onClick={handleBtPlus}> + </button>
        </div>
      </form>
    </>
  );
}
