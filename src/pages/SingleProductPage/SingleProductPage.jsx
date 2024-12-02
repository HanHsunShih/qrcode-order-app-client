import { useEffect, useState } from "react";
import "./SingleProductPage.scss";
import { getProductById } from "../../../utils/apiUtils.mjs";
import { useNavigate, useParams } from "react-router-dom";

export default function SingleProductPage({ cartInfo, setCartInfo }) {
  const navigate = useNavigate();
  const { product_id } = useParams();

  const [product, setProduct] = useState(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const productRender = async () => {
    try {
      const selectedProduct = await getProductById(product_id);
      setProduct(selectedProduct);

      return;
    } catch (error) {
      console.log(error);
    }
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

  const handleAddToCart = (event) => {
    event.preventDefault();
    // Add new object to cartInfo depending on purchaseQuantity
    // use spread operator to add new objects to the array

    // 1. Make a new array
    // 2. spread over the old array
    // 3. add the `product` in the new array

    const updatedBasket = [];

    for (let i = 0; i < purchaseQuantity; i++) {
      // set state ...
      updatedBasket.push(product);
      // setCartInfo([...cartInfo, product]);
    }

    // setCartInfo([...cartInfo, updatedBasket]); // [{}, {}, [{}, {}]]
    setCartInfo([...cartInfo, ...updatedBasket]); // [{}, {}, {}, {}]
    // set state...

    navigate("/menu");
  };

  useEffect(() => {
    productRender();
  }, []);

  return (
    <>
      <button
        onClick={() => {
          navigate("/menu");
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

      <form onSubmit={handleAddToCart}>
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
        <button>Add to cart</button>
      </form>
    </>
  );
}
