import { useEffect, useRef, useState } from "react";
import "./MenuCard.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
const api_url = import.meta.env.VITE_SERVER_URL;
export default function MenuCard({
  productsInfoArr,
  handleAddToCart,
  setScrollPosition,
  handleAddToCartPosition,
}) {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState(null);
  const types = [...new Set(productsInfoArr.map((product) => product.type))];

  const handleScrollerToProduct = (i) => {
    const element = document.getElementById(`section${i}`);
    const offset =
      parseFloat(getComputedStyle(document.documentElement).fontSize) * 5;
    const yPosition =
      element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: yPosition,
      behavior: "smooth",
    });
  };

  const handleScrollToTag = (tagIndex) => {
    if (menuRef.current) {
      const tags = menuRef.current.children;
      const targetTag = tags[tagIndex];

      targetTag.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handleReadMore = (productId) => {
    setScrollPosition(window.scrollY);
    navigate(`/menu/${productId}`, {
      state: { scrollPosition: window.scrollY },
    });
  };

  return (
    <main className="menuCard__box">
      <div className="menuCard__type-scroller" ref={menuRef}>
        {types.map((type, i) => {
          return (
            <button
              key={i}
              className={`menuCard__type ${
                activeType === i ? "menuCard__type-active" : ""
              }`}
              onClick={() => {
                setActiveType(i);
                handleScrollerToProduct(i);
                setTimeout(() => handleScrollToTag(i), 300);
              }}
            >
              {type}
            </button>
          );
        })}
      </div>

      <div>
        {types.map((type, i) => {
          return (
            <div key={i}>
              <h1 className="menuCard__product-type" id={`section${i}`}>
                {type}
              </h1>
              {productsInfoArr
                .filter((productInfo) => {
                  return productInfo.type === type;
                })
                .map((productInfo) => {
                  return (
                    <div className="menuCard__product-box" key={productInfo.id}>
                      <div>
                        <h2 className="menuCard__product-name">
                          {productInfo.product_name}
                        </h2>
                        <p className="menuCard__product-price">
                          £{productInfo.price_gbp}
                        </p>
                        <p>{productInfo.description}</p>
                        <button
                          className="menuCard__link"
                          onClick={() => {
                            handleReadMore(productInfo.id);
                          }}
                        >
                          <p>read more...</p>
                        </button>
                      </div>
                      <div className="menuCard__product-box-right">
                        {productInfo.image && (
                          <img
                            className="menuCard__image"
                            src={`${api_url}/menu-images/${productInfo.image}`}
                            alt={`${productInfo.image}`}
                          />
                        )}

                        <div>
                          <button
                            onClick={() => {
                              handleAddToCart(productInfo),
                                handleAddToCartPosition();
                            }}
                            className="menuCard__bt"
                          >
                            <h3> + </h3>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </main>
  );
}
