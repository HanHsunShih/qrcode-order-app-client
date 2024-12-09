import { useEffect, useState } from "react";
import "./SingleProductPage.scss";
import { getProductById } from "../../../utils/apiUtils.mjs";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function SingleProductPage({ cartInfo, setCartInfo }) {
  const navigate = useNavigate();
  const { product_id } = useParams();
  const location = useLocation();
  const scrollPosition = location.state?.scrollPosition || 0;

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

    console.log("Single +, scrollPosition = ");
    console.log(scrollPosition);

    return setPurchaseQuantity(purchaseQuantity + 1);
  };

  const handleAddToCart = (event) => {
    event.preventDefault();

    const updatedBasket = [];

    for (let i = 0; i < purchaseQuantity; i++) {
      updatedBasket.push(product);
    }

    setCartInfo([...cartInfo, ...updatedBasket]);
    console.log("🥎Single, scrollPosition = ");
    console.log(scrollPosition);

    navigate("/menu", { state: scrollPosition });

    console.log("🏀Single, scrollPosition = ");
    console.log(scrollPosition);
  };

  useEffect(() => {
    productRender();
  }, []);

  return (
    <main className="single-product-page__box">
      <button
        className="single-product-page__bt"
        onClick={() => {
          navigate("/menu");
        }}
      >
        <h3>←</h3>
      </button>
      <div className="single-product-page__content">
        {product ? (
          <div className="single-product-page__content">
            <h1 className="single-product-page__product-title">
              {product.product_name}
            </h1>
            <img
              className="single-product-page__image"
              src={`http://localhost:8081/menu-images/${product.image}`}
              alt=""
            />
            <h2>£{product.price_gbp}</h2>
            <p className="single-product-page__description">
              {product.description}
            </p>
          </div>
        ) : (
          <p>loading...</p>
        )}

        <form onSubmit={handleAddToCart} className="single-product-page__form">
          <textarea
            className="single-product-page__text-area"
            rows="5"
            cols="30"
            placeholder="type in special request..."
          ></textarea>
          <div className="single-product-page__bt-box">
            <div className="single-product-page__count-box">
              <button
                className="single-product-page__bt"
                onClick={handleBtMinus}
              >
                <h1> - </h1>
              </button>
              <h1 className="single-product-page__purchase-count">
                {purchaseQuantity}
              </h1>
              <button
                className="single-product-page__bt"
                onClick={handleBtPlus}
              >
                <h1> + </h1>
              </button>
            </div>
            <button className="single-product-page__bt single-product-page__bt-cart">
              <h2>Add to cart</h2>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
