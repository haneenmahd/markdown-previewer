import { StrictMode } from "react";
import ReactDOM from "react-dom";
import splitbee from '@splitbee/web';

splitbee.init({});

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
