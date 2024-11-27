import "./MenuCard.scss";
import { Link } from "react-router-dom";

export default function MenuCard({ productsInfoArr }) {
  console.log(productsInfoArr);
  return (
    <>
      <div>
        {productsInfoArr.map((productInfo) => {
          return (
            <>
              <article
                key={productInfo.id}
                className={`menuCard-box menuCard-box${
                  productInfo.category === "Drinks" ? "__drinks" : "__food"
                }`}
              >
                <div>
                  <h3>{productInfo.product_name}</h3>
                  <p>£{productInfo.price_gbp}</p>
                  <p>{productInfo.description}</p>
                  <p>
                    <Link
                      to={`/menu/${productInfo.id}`}
                      state={{ scrollPosition: window.scrollY }}
                    >
                      read more...
                    </Link>
                  </p>
                </div>
                <div>
                  <button className="menuCard__bt">
                    {" "}
                    <h3> + </h3>{" "}
                  </button>
                </div>
              </article>
            </>
          );
        })}
      </div>
    </>
  );
}
