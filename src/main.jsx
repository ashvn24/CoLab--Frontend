import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/Store/Store.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <NextUIProvider>
          <GoogleOAuthProvider clientId='992019703198-773u0jasljbf9eao5n8qf5903uquokmp.apps.googleusercontent.com'>
            <App />
          </GoogleOAuthProvider>
        </NextUIProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
