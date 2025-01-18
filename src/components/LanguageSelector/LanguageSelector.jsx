import { useTranslation } from "react-i18next";
import "./LanguageSelector.scss";
import { useState } from "react";

export default function LanguageSelector({ setLanStatus }) {
  // const [lanStatus, setLanStatus] = useState("ch");
  const languages = [
    { code: "en", lang: "English" },
    { code: "ch", lang: "中文" },
  ];

  const { i18n } = useTranslation();

  const handleSelectLang = (lang) => {
    i18n.changeLanguage(lang);
    setLanStatus(lang);

    // console.log("lanStatus: ");
    // console.log(lanStatus);
  };

  return (
    <div className="lang-btn-box">
      {languages.map((language) => {
        return (
          <button
            key={language.code}
            className={`lang-btn${
              language.code === i18n.language ? " lang-btn--selected" : ""
            }`}
            onClick={() => handleSelectLang(language.code)}
          >
            {language.lang}
          </button>
        );
      })}
    </div>
  );
}
