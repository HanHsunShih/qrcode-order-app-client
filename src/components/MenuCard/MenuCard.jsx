import { useState } from "react";
import "./MenuCard.scss";
import { Link, useParams } from "react-router-dom";

export default function MenuCard({ productsInfoArr, handleAddToCart }) {
  const { userId } = useParams();

  return (
    <>
      <div>
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
      </div>
    </>
  );
}
