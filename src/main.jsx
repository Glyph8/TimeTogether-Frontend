import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // 여기까지가 기본 제공되는 것들
import { BrowserRouter } from "react-router-dom"; // 라우터 사용하기 위함
import store from './store.js'
import {Provider} from "react-redux";
createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
      </Provider>
  </StrictMode>
);
