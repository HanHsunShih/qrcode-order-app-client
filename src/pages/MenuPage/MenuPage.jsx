import "./MenuPage.scss";
import { useState, useEffect } from "react";
import MenuCard from "../../components/MenuCard/MenuCard";
import { getAllProducts } from "../../../utils/apiUtils.mjs";
import { Link, useNavigate, useParams } from "react-router-dom";
import igIcon from "../../assets/images/instagram.png";
import { useLocation } from "react-router-dom";

export default function MenuPage({
  handleAddToCart,
  cartInfo,
  handleCartReset,
}) {
  // const [scrollPosition, setScrollPosition] = useState();
  const [productsInfo, setProductsInfo] = useState([]);
  const navigate = useNavigate();
  const { userId } = useParams();

  const location = useLocation();
  const initialScrollPosition = location.state?.scrollPosition || 0;
  const [scrollPosition, setScrollPosition] = useState(initialScrollPosition);

  const menuRender = async () => {
    try {
      const products = await getAllProducts();

      setProductsInfo(
        products.map((product) => {
          return product;
        })
      );
    } catch (error) {
      console.error("❄️Error invoke getAllProducts function" + error);
    }
  };

  useEffect(() => {
    menuRender();
    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
  }, []);

  useEffect(() => {
    console.log("MenuPage, 🪀Updated scrollPosition:");
    console.log(scrollPosition);

    console.log("😡initialScrollPosition = ");
    console.log(initialScrollPosition);
  }, [scrollPosition]);

  useEffect(() => {
    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
  }, [scrollPosition]);

  return (
    <>
      <main className="menu-page__box">
        <div className="menu-page__top-box">
          <button
            className="menu-page__go-back-bt"
            onClick={() => {
              handleCartReset();
              navigate(`/`);
            }}
          >
            <h3>←</h3>
          </button>
          <Link to="https://www.instagram.com/seaward.m.plan_coffee.diving/?hl=zh-tw">
            <img className="menu-page__ig-icon" src={igIcon} alt="" />
          </Link>
        </div>

        <h1 className="menu-page__title">Menu</h1>

        {productsInfo.length > 0 ? (
          <MenuCard
            productsInfoArr={productsInfo}
            handleAddToCart={handleAddToCart}
            setScrollPosition={setScrollPosition}
            scrollPosition={scrollPosition}
          />
        ) : (
          <p>loading...</p>
        )}
        <Link to="/cart" className="menu-page__cart">
          <h1>Cart {cartInfo.length}</h1>
        </Link>
      </main>
    </>
  );
}
