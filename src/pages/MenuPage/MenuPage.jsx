import "./MenuPage.scss";
import { useState, useEffect } from "react";
import MenuCard from "../../components/MenuCard/MenuCard";
import { getAllProducts } from "../../../utils/apiUtils.mjs";
import { useNavigate, useParams } from "react-router-dom";

export default function MenuPage({
  handleAddToCart,
  // handleNavigateToCart,
  cartCount,
  cartInfo,
}) {
  const [productsInfo, setProductsInfo] = useState([]);
  const navigate = useNavigate();
  const { userId } = useParams;

  const menuRender = async () => {
    try {
      const products = await getAllProducts();

      setProductsInfo(
        products.map((product) => {
          return product;
        })
      );
    } catch (error) {
      console.error("Error invoke getAllProducts function" + error);
    }
  };

  const handleNavigateToCart = (event) => {
    event.preventDefault();
    navigate(`/cart/${userId}`, { state: { cartInfo } });
  };

  useEffect(() => {
    menuRender();
  }, []);

  return (
    <>
      <main className="menu-page__box">
        <button onClick={handleNavigateToCart}>
          <h2 className="menu-page__cart">Cart {cartCount}</h2>
        </button>
        <button
          className="menu-page__go-back-bt"
          onClick={() => {
            navigate(-1);
          }}
        >
          <p>←</p>
        </button>
        <div className="menu-page__top-box">
          <h1 className="menu-page__title">Menu</h1>
        </div>
        {productsInfo.length > 0 ? (
          <MenuCard
            productsInfoArr={productsInfo}
            handleAddToCart={handleAddToCart}
          />
        ) : (
          <p>loading...</p>
        )}
      </main>
    </>
  );
}
