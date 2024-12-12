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
  const navigate = useNavigate();
  // const { userId } = useParams();
  const location = useLocation();
  const initialScrollPosition = location.state ? location.state : 0;
  const [scrollPosition, setScrollPosition] = useState(initialScrollPosition);
  const [productsInfo, setProductsInfo] = useState([]);

  window.scrollTo({ top: scrollPosition, behavior: "smooth" });

  console.log(location.state);
  console.log(scrollPosition);
  console.log(typeof scrollPosition);

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

  const handleAddToCartPosition = () => {
    setScrollPosition(window.scrollY);
  };

  const handleGoToCart = () => {
    setScrollPosition(window.scrollY);
    navigate("/cart", { state: { scrollPosition: window.scrollY } });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    menuRender();
  }, []);

  return (
    <div className="menu-page">
      <main className="menu-page__box">
        <div className="menu-page__top-box">
          <button
            className="menu-page__go-back-bt"
            onClick={() => {
              handleCartReset();
              navigate(`/`);
            }}
          >
            <h3 className="menu-page__go-back-bt-arrow">←</h3>
          </button>
          <h1 className="menu-page__title">Menu</h1>
          <Link to="https://www.instagram.com/seaward.m.plan_coffee.diving/?hl=zh-tw">
            <img className="menu-page__ig-icon" src={igIcon} alt="" />
          </Link>
        </div>

        {productsInfo.length > 0 ? (
          <MenuCard
            productsInfoArr={productsInfo}
            handleAddToCart={handleAddToCart}
            setScrollPosition={setScrollPosition}
            scrollPosition={scrollPosition}
            handleAddToCartPosition={handleAddToCartPosition}
          />
        ) : (
          <p>loading...</p>
        )}
        <button onClick={handleGoToCart} className="menu-page__cart">
          <h3 className="menu-page__cart-text">Cart {cartInfo.length}</h3>
        </button>
      </main>
    </div>
  );
}
