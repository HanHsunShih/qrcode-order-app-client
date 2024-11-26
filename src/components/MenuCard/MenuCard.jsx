import "./MenuCard.scss";

export default function MenuCard({ productsInfoArr }) {
  return (
    <>
      {productsInfoArr.map((productInfo) => {
        if (productInfo.category === "Drinks") {
          return (
            <div className="menuCard-box__drinks" key={productInfo.id}>
              <h3>{productInfo.product_name}</h3>
              <p>£{productInfo.price_gbp}</p>
              <p>{productInfo.description}</p>
            </div>
          );
        } else {
          return (
            <div className="menuCard-box__food" key={productInfo.id}>
              <h3>{productInfo.product_name}</h3>
              <p>£{productInfo.price_gbp}</p>
              <p>{productInfo.description}</p>
            </div>
          );
        }
      })}
    </>
  );
}
