import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import UserPanelContext from "./context/UserPanelContext.jsx";
createRoot(document.getElementById("root")).render(
  <UserContext>
    <CaptainContext>
      <UserPanelContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserPanelContext>
    </CaptainContext>
  </UserContext>
);
