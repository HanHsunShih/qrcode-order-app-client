import "./MenuPage.scss";
import { useState, useEffect } from "react";
import MenuCard from "../../components/MenuCard/MenuCard";
import { getAllProducts } from "../../../utils/apiUtils.mjs";

export default function MenuPage() {
  const [productsInfo, setProductsInfo] = useState([]); //array

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
      <h1>Menu</h1>
      {productsInfo.length > 0 ? (
        <MenuCard productsInfoArr={productsInfo} />
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
