import { useEffect, useRef, useState } from "react";
import "./MenuCard.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const api_url = import.meta.env.VITE_SERVER_URL;

export default function MenuCard({
  productsInfoArr,
  handleAddToCart,
  setScrollPosition,
  handleAddToCartPosition,
  lanStatus,
}) {
  const menuRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("Pour-over Coffee");
  const types = [...new Set(productsInfoArr.map((product) => product.type))];
  const typesCh = [
    ...new Set(productsInfoArr.map((product) => product.type_ch)),
  ];
  const [selectedLanInfo, setSelectedLanInfo] = useState({
    typeArr: [],
    category_lan: "",
    type_lan: "",
    product_name_lan: "",
    price_lan: "",
    description_lan: "",
    option_lan: "",
  });

  const handleScrollerToProduct = (i) => {
    const element = document.getElementById(`section${i}`);
    const offset =
      parseFloat(getComputedStyle(document.documentElement).fontSize) * 5;
    const yPosition =
      element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: yPosition,
      behavior: "smooth",
    });
  };

  const handleScrollToTag = (tagIndex) => {
    if (menuRef.current) {
      const tags = menuRef.current.children;
      const targetTag = tags[tagIndex];

      targetTag.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handleReadMore = (productId) => {
    setScrollPosition(window.scrollY);
    navigate(`/menu/${productId}`, {
      state: { scrollPosition: window.scrollY, lanStatus: lanStatus },
    });
  };

  //when browsing the menu, scroll active tag to center
  const typeRefs = useRef([]);
  const [tagRanges, setTagRanges] = useState([]);

  const typeLan = () => {
    if (lanStatus === "en") {
      setSelectedLanInfo({
        typeArr: types,
        category_lan: "category",
        type_lan: "type",
        product_name_lan: "product_name",
        price_lan: "price_gbp",
        description_lan: "description",
        option_lan: "option",
      });
    } else {
      setSelectedLanInfo({
        typeArr: typesCh,
        category_lan: "category_ch",
        type_lan: "type_ch",
        product_name_lan: "product_name_ch",
        price_lan: "price_ntd",
        description_lan: "description_ch",
        option_lan: "option_ch",
      });
    }
  };

  useEffect(() => {
    const ranges = typeRefs.current.map((typeRef) => {
      const offsetTop = typeRef?.offsetTop || 0;
      const remValue = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      return offsetTop - 15 * remValue;
    });

    const calculateRange = ranges.map((start, i) => {
      return [start, ranges[i + 1] ? ranges[i + 1] - 1 : Infinity];
    });

    setTagRanges(calculateRange);
    typeLan();
  }, [productsInfoArr]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const activeTag = tagRanges.findIndex(([start, end]) => {
        return scrollY >= start && scrollY <= end;
      });

      if (activeTag !== -1) {
        const tagElement = menuRef.current?.children[activeTag];
        if (tagElement) {
          tagElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
      setActiveType(activeTag);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tagRanges]);

  return (
    <main className="menuCard__box">
      <div className="menuCard__type-scroller" ref={menuRef}>
        {selectedLanInfo.typeArr?.map((type, i) => {
          return (
            <button
              key={i}
              className={`menuCard__type ${
                activeType === i ? "menuCard__type-active" : ""
              }`}
              onClick={() => {
                setActiveType(i);
                handleScrollerToProduct(i);
                setTimeout(() => handleScrollToTag(i), 300);
              }}
            >
              {type}
            </button>
          );
        })}
      </div>

      <div>
        {selectedLanInfo.typeArr.map((type, i) => {
          return (
            <div key={i}>
              <h1 className="menuCard__product-type" id={`section${i}`}>
                {type}
              </h1>
              {productsInfoArr
                .filter((productInfo) => {
                  return productInfo[selectedLanInfo.type_lan] === type;
                })
                .map((productInfo, productIndex) => {
                  return (
                    <div
                      className="menuCard__product-box"
                      key={productInfo.id}
                      ref={
                        productIndex === 0
                          ? (el) => (typeRefs.current[i] = el)
                          : null
                      }
                    >
                      <div>
                        <h2 className="menuCard__product-name">
                          {productInfo[selectedLanInfo.product_name_lan]}
                        </h2>
                        <p className="menuCard__product-price">
                          {t("priceIcon")}&nbsp;
                          {productInfo[selectedLanInfo.price_lan]}
                        </p>
                        <p className="menuCard__product-description">
                          {productInfo[selectedLanInfo.description_lan]}
                        </p>
                        <button
                          className="menuCard__link"
                          onClick={() => {
                            handleReadMore(productInfo.id);
                          }}
                        >
                          <p className="menuCard__product-read-more">
                            {t("readMore")}
                          </p>
                        </button>
                      </div>
                      <div className="menuCard__product-box-right">
                        {productInfo.image && (
                          <img
                            className="menuCard__image"
                            src={`${api_url}/menu-images/${productInfo.image}`}
                            alt={`${productInfo.image}`}
                          />
                        )}

                        <div>
                          <button
                            onClick={() => {
                              handleAddToCart(productInfo),
                                handleAddToCartPosition();
                            }}
                            className="menuCard__bt"
                          >
                            <h3 className="menuCard__bt-text"> + </h3>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </main>
  );
}
