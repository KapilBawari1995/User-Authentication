import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { Toaster } from "react-hot-toast";

import "./App.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
        <Toaster
          position="top-right"
          gutter={10}
          containerStyle={{
            top: 20,
            right: 20,
          }}
        />

        <App />
    </Provider>
  </React.StrictMode>
);