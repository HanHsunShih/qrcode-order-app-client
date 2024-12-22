import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n.js";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <React.StrictMode fallback="loading...👩🏻‍💻">
      <App />
    </React.StrictMode>
  </StrictMode>
);
