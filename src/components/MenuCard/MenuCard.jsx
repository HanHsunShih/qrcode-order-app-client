import { useState } from "react";
import "./MenuCard.scss";
import { Link, useParams } from "react-router-dom";

export default function MenuCard({ productsInfoArr, handleAddToCart }) {
  const [activeType, setActiveType] = useState(false);
  const types = [...new Set(productsInfoArr.map((product) => product.type))];

  const handleScrollerClick = (i) => {
    const element = document.getElementById(`section${i}`);
    const offset =
      parseFloat(getComputedStyle(document.documentElement).fontSize) * 9; // 將 2rem 轉為 px
    const yPosition =
      element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: yPosition,
      behavior: "smooth",
    });

    // setActiveType(!activeType);
  };

  return (
    <>
      <div className="menuCard__type-scroller">
        {types.map((type, i) => {
          return (
            <button
              key={i}
              className={`menuCard__type ${
                activeType === true ? "menuCard__type-active" : ""
              }`}
              onClick={() => {
                handleScrollerClick(i);
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
                        <p>£{productInfo.price_gbp}</p>
                        <p>{productInfo.description}</p>
                        <p>
                          <Link
                            to={`/menu/${productInfo.id}`}
                            className="menuCard__link"
                          >
                            read more...
                          </Link>
                        </p>
                      </div>
                      <div className="menuCard__product-box-right">
                        <img
                          className="menuCard__image"
                          src={`http://localhost:8081/menu-images/${productInfo.image}`}
                          alt={`${productInfo.image}`}
                        />
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
      {/* <div>
        {productsInfoArr.map((productInfo) => {
          return (
            <article
              key={productInfo.id}
              className={`menuCard-box menuCard-box${
                productInfo.category === "Drinks" ? "__drinks" : "__food"
              }`}
            >
              <div className="menuCard__product-box">
                <div>
                  <h2>{productInfo.product_name}</h2>
                  <p>£{productInfo.price_gbp}</p>
                  <p>{productInfo.description}</p>
                  <p>
                    <Link
                      to={`/menu/${productInfo.id}`}
                      className="menuCard__link"
                    >
                      read more...
                    </Link>
                  </p>
                </div>
                <div className="menuCard__product-box-right">
                  <img
                    className="menuCard__image"
                    src={`http://localhost:8081/menu-images/${productInfo.image}`}
                    alt={`${productInfo.image}`}
                  />
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
            </article>
          );
        })}
      </div> */}
      {/* <div>
        <p>Pour-over Coffee</p>
        {productsInfoArr
          .filter((productInfo) => {
            return productInfo.type === "Pour-over Coffee";
          })
          .map((productInfo) => {
            return <p key={productInfo.id}>{productInfo.product_name}</p>;
          })}
      </div> */}
    </>
  );
}
