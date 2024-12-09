import { useEffect, useRef, useState } from "react";
import "./MenuCard.scss";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function MenuCard({
  productsInfoArr,
  handleAddToCart,
  setScrollPosition,
}) {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState(false);
  const types = [...new Set(productsInfoArr.map((product) => product.type))];

  const handleScrollerToProduct = (i) => {
    const element = document.getElementById(`section${i}`);
    const offset =
      parseFloat(getComputedStyle(document.documentElement).fontSize) * 9;
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
    console.log("MenuCard, window.scrollY = ");
    console.log(window.scrollY);
  };

  return (
    <>
      <div className="menuCard__type-scroller" ref={menuRef}>
        {types.map((type, i) => {
          return (
            <button
              key={i}
              className={`menuCard__type ${
                activeType === true ? "menuCard__type-active" : ""
              }`}
              onClick={() => {
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
                        <h3 className="menuCard__product-name">
                          {productInfo.product_name}
                        </h3>
                        <p>£{productInfo.price_gbp}</p>
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
                            src={`http://localhost:8081/menu-images/${productInfo.image}`}
                            alt={`${productInfo.image}`}
                          />
                        )}

                        <div>
                          <button
                            onClick={() => handleAddToCart(productInfo)}
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
    </>
  );
}
