import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "ch",
    resources: {
      en: {
        translation: {
          login: "admin",
          tableNumber: "enter table number",
          continueBt: "continue",
          browseMenuBt: "Browse the Menu",
        },
      },
      ch: {
        translation: {
          login: "登入",
          tableNumber: "請輸入桌號",
          continueBt: "繼續",
          browseMenuBt: "瀏覽菜單",
        },
      },
    },
  });
