import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import errorLog from './servises/logService';
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

errorLog.init();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
