import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./redux/index";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

// logger 미들웨어는 마지막 순서에 와야함.
let localRedux;
if (process.env.NODE_ENV !== "production") {
  localRedux = createStore(rootReducer, applyMiddleware(thunk, logger));
} else {
  localRedux = createStore(rootReducer, thunk);
}

export const reduxStore = localRedux;

ReactDOM.render(
  <Provider store={reduxStore}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
