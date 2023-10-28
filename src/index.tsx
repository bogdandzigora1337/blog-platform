import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider } from "antd";

import App from "./components/App/App";
import { store } from "./redux/store/store";
import { persistor } from "./redux/store/store";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider>
          <App />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
