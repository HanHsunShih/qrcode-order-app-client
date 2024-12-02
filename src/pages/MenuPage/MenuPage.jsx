import "./MenuPage.scss";
import { useState, useEffect } from "react";
import MenuCard from "../../components/MenuCard/MenuCard";
import { getAllProducts } from "../../../utils/apiUtils.mjs";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function MenuPage({
  handleAddToCart,
  cartInfo,
  handleCartReset,
}) {
  const [productsInfo, setProductsInfo] = useState([]);
  const navigate = useNavigate();
  const { userId } = useParams();

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

  useEffect(() => {
    menuRender();
  }, []);

  return (
    <>
      <main className="menu-page__box">
        <Link to={`/cart/${userId}`} className="menu-page__cart">
          Cart {cartInfo.length}
        </Link>
        <button
          className="menu-page__go-back-bt"
          onClick={() => {
            handleCartReset();
            navigate(`/`);
          }}
        >
          ←
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
