import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as signalR from "@microsoft/signalr";

import "./index.css";

import store from "redux/store";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// REALTIME BOOKING CONNECTION
export const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://movienew.cybersoft.edu.vn/DatVeHub")
  .configureLogging(signalR.LogLevel.Information)
  .build();

(async () => {
  try {
    await connection.start();
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  } catch (error) {
    throw error;
  }
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
