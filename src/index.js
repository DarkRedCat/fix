import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./style/scss/AllStyles.scss";
import reportWebVitals from "./reportWebVitals";

import App from "./app/App";
import { Router } from "react-router-dom";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";
import history from "./app/utils/history";

const store = createStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
