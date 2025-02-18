import "./HistoryPage.scss";
import { Link } from "react-router-dom";
import { getCompletedOrders } from "../../../utils/apiUtils.mjs";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";

export default function HistoryPage() {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [renderedOrders, setRenderedOrders] = useState([]);
  const lanStatus = localStorage.getItem("lanPre");
  const [productLan, setProductLan] = useState("");
  const { t } = useTranslation();

  const typeLan = () => {
    if (lanStatus == "en") {
      setProductLan("product_name");
    } else {
      setProductLan("product_name_ch");
    }
  };

  const orderRender = async () => {
    try {
      const allOrders = await getCompletedOrders();

      setRenderedOrders(allOrders);
      setCompletedOrders(allOrders);

      console.log("allOrders: ");
      console.log(allOrders);

      return;
    } catch (error) {
      console.error("🎄Error invoking getCompletedOrders" + error);
    }
  };

  function formatIsoDate(isoDate) {
    const date = new Date(isoDate);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}/${day} ${hours}:${minutes}`;
  }

  const handleDropDownMenu = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "yesterday") {
      handleYesterdayData();
    } else if (selectedValue === "last7days") {
      handle7daysData();
    } else if (selectedValue === "last30days") {
      handle30daysData();
    } else {
      orderRender();
    }
  };

  const handleYesterdayData = () => {
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const formattedYesterday = yesterday.toISOString().split("T")[0];

    const yesterdayOrders = completedOrders.filter((completedOrder) =>
      completedOrder[1][0].created_at.startsWith(formattedYesterday)
    );

    setRenderedOrders(yesterdayOrders);

    return;
  };

  const handle7daysData = () => {
    const today = new Date();
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(today.getDate() - 7);

    const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split("T")[0];

    const sevenDaysOrders = completedOrders.filter((completedOrder) => {
      const orderDate = completedOrder[1][0].created_at.split("T")[0];
      return orderDate >= formattedSevenDaysAgo;
    });

    setRenderedOrders(sevenDaysOrders);
  };

  const handle30daysData = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date();

    thirtyDaysAgo.setDate(today.getDate() - 30);

    const formattedThirtyDaysAgo = thirtyDaysAgo.toISOString().split("T")[0];

    const thirtyDaysOrders = completedOrders.filter((completedOrder) => {
      const orderDate = completedOrder[1][0].created_at.split("T")[0];
      return orderDate >= formattedThirtyDaysAgo;
    });

    setRenderedOrders(thirtyDaysOrders);
  };

  useEffect(() => {
    orderRender();
    typeLan();
  }, []);

  return (
    <div className="order-history__big-box">
      <main className="order-history">
        <Link to={"/orders"} className="order-history__back-bt">
          <h3 className="order-history__back-bt-arrow">←</h3>
        </Link>
        <h1 className="order-history__title">{t("orderHistory")}:</h1>
        <select
          name="choose-date"
          id=""
          className="order-history__dropdown-menu"
          onChange={handleDropDownMenu}
        >
          <option className="order-history__dropdown-option" value="all">
            {t("dropDownAll")}
          </option>
          <option className="order-history__dropdown-option" value="yesterday">
            {t("dropDownYesterday")}
          </option>
          <option className="order-history__dropdown-option" value="last7days">
            {t("dropDown7Days")}
          </option>
          <option className="order-history__dropdown-option" value="last30days">
            {t("dropDown30Days")}
          </option>
        </select>
        {renderedOrders ? (
          renderedOrders.map((renderedOrder) => {
            return (
              <section key={renderedOrder[0]} className="order-history__box">
                <div className="order-box">
                  <p className="order-history__ordered-date">
                    {t("orderedDate")}:{" "}
                    {formatIsoDate(renderedOrder[1][0].created_at)}
                  </p>
                  {renderedOrder[1].map((item, i) => {
                    return (
                      <p key={i} className="order-history__orders">
                        {item[productLan]} x {item.quantity}
                      </p>
                    );
                  })}
                </div>
              </section>
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </main>
    </div>
  );
}
