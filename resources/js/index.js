import React from "react";
import ReactDOM from "react-dom";
// import 'normalize.css'
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

// const store = createStore(reducer)

ReactDOM.render(<App />, document.getElementById("app"));
