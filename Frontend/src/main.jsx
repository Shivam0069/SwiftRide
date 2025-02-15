import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import UserPanelContext from "./context/UserPanelContext.jsx";
import CaptainPanelContext from "./context/CaptainPanelContext.jsx";
import RideContext from "./context/RideContext.jsx";
import SocketProvider from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserContext>
    <CaptainContext>
      <UserPanelContext>
        <CaptainPanelContext>
          <RideContext>
            <SocketProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SocketProvider>
          </RideContext>
        </CaptainPanelContext>
      </UserPanelContext>
    </CaptainContext>
  </UserContext>
);
