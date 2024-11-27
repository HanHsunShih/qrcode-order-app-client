import "./MenuPage.scss";
import { useState, useEffect } from "react";
import MenuCard from "../../components/MenuCard/MenuCard";
import { getAllProducts } from "../../../utils/apiUtils.mjs";
import { useLocation } from "react-router-dom";

export default function MenuPage() {
  const [productsInfo, setProductsInfo] = useState([]); //array
  const location = useLocation();

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
    console.log("location.state :");
    console.log(location.state);
    if (location.state?.scrollPosition !== undefined) {
      window.scrollTo(0, location.state.scrollPosition);
    }
  }, [location.state]);

  useEffect(() => {
    menuRender();
  }, []);

  return (
    <>
      <h1 className="menu-page__title">Menu</h1>
      {productsInfo.length > 0 ? (
        <MenuCard productsInfoArr={productsInfo} />
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
