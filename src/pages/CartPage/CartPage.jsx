import { useState, useEffect } from "react";
import "./CartPage.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CartPage({
  cartInfo,
  setCartInfo,
  tableNumber,
  setTableNumber,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [tableMessage, setTableMessage] = useState("");
  const [showTableInput, setShowTableInput] = useState(false);
  const [paymentMessage, setPaymentessage] = useState("");
  const scrollPosition = location.state?.scrollPosition || 0;
  const lanStatus = location.state?.lanStatus;
  const [selectedLanInfo, setSelectedLanInfo] = useState({
    product_name_lan: "",
    price_lan: "",
  });

  let totalPrice = 0;
  for (let i = 0; i < cartInfo.length; i++) {
    totalPrice += parseFloat(cartInfo[i][selectedLanInfo.price_lan]);
  }

  const formattedTotalPrice = totalPrice.toFixed(1);

  const typeLan = () => {
    if (lanStatus === "en") {
      setSelectedLanInfo({
        product_name_lan: "product_name",
        price_lan: "price_gbp",
      });
      let formattedTotalPrice = totalPrice.toFixed(2);
    } else {
      setSelectedLanInfo({
        product_name_lan: "product_name_ch",
        price_lan: "price_ntd",
      });
    }
  };

  const handlePayClick = () => {
    if (formattedTotalPrice === "0.00") {
      setPaymentessage(t("paymentMessage"));
      return;
    } else if (tableNumber === "") {
      setTableMessage(t("showTableInput"));
      setShowTableInput(true);
      return;
    } else if (isNaN(tableNumber) || tableNumber < 0 || tableNumber > 20) {
      setTableMessage(t("tableMessage"));
      setShowTableInput(true);
      return;
    }
    navigate("/payment", { state: { formattedTotalPrice, lanStatus } });
  };

  const handleDelete = (indexToDelete) => {
    const updatedCart = cartInfo.filter(
      (pruduct, index) => index !== indexToDelete
    );
    setCartInfo(updatedCart);
  };

  const handleTableNumberChange = (event) => {
    setTableMessage("");
    setTableNumber(event.target.value);
  };

  const handleGoBack = () => {
    navigate("/menu", { state: { scrollPosition, lanStatus } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    typeLan();
  }, []);

  return (
    <div className="cart-page__big-box">
      <main className="cart-page">
        <div className="cart-page__animation-box">
          <iframe
            className="cart-page__animation"
            src="https://lottie.host/embed/7a203e77-1382-4000-86d0-5d57e5d52723/3AKtCYFLwz.lottie"
          ></iframe>
        </div>
        <button onClick={handleGoBack} className="cart-page__bt">
          <h3 className="cart-page__bt-text">←</h3>
        </button>
        <div className="cart-page__box">
          <h1 className="cart-page__title">{t("yourCart")}</h1>
          {cartInfo.map((item, index) => {
            return (
              <div key={index} className="cart-page__box-small">
                <div className="cart-page__box-left">
                  <h3 className="cart-page__product">
                    {item[selectedLanInfo.product_name_lan]}
                  </h3>
                  <p className="cart-page__price">
                    {t("priceIcon")} {item[selectedLanInfo.price_lan]}
                  </p>
                </div>
                <button
                  className="cart-page__bt cart-page__bt-delete"
                  onClick={() => handleDelete(index)}
                >
                  <h3 className="cart-page__delete">{t("delete")}</h3>
                </button>
              </div>
            );
          })}
          <p className="cart-page__total-price">{t("totalPrice")}</p>
          <p className="cart-page__text">
            {t("priceIcon")}&nbsp;
            {formattedTotalPrice}
          </p>
          {showTableInput && (
            <input
              type="number"
              value={tableNumber}
              onChange={handleTableNumberChange}
              className="cart-page__table-number-input"
            ></input>
          )}
          {tableMessage && <p className="cart-page__message">{tableMessage}</p>}
          {paymentMessage && (
            <p className="cart-page__message">{paymentMessage}</p>
          )}
          <button
            className="cart-page__bt cart-page__bt-pay"
            onClick={handlePayClick}
          >
            <h2 className="cart-page__pay-bt">{t("paybtn")}</h2>
          </button>
        </div>
      </main>
    </div>
  );
}
